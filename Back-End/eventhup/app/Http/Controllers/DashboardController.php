<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    // السعر محفوظ كنص، فبنحوّله لرقم ("$50" أو "Free" أو "50")
    private function parsePrice($price): float
    {
        $clean = preg_replace('/[^0-9.]/', '', (string) $price);
        return $clean === '' ? 0 : (float) $clean;
    }

    private function canAccessDashboard($user): bool
    {
        return in_array($user->role, ['admin', 'organizer']);
    }

    private function canManage($user, Event $event): bool
    {
        return $user->role === 'admin' || $event->organizer_id === $user->id;
    }

    public function index(Request $request)
    {
        $user = $request->user();

        if (!$this->canAccessDashboard($user)) {
            return response()->json(['message' => 'Only organizers can access the dashboard'], 403);
        }

        // الأدمن بيشوف كل الفعاليات، والمنظّم بيشوف فعالياته بس
        $query = $user->role === 'admin'
            ? Event::query()
            : Event::where('organizer_id', $user->id);

        $events = $query->withCount('bookings')->orderByDesc('id')->get();
        $today = Carbon::today();

        // ====== قائمة الفعاليات ======
        $eventsList = $events->map(function ($event) use ($today) {
            $eventDate = Carbon::parse($event->date)->startOfDay();

            if ($eventDate->lt($today)) {
                $status = 'Ended';
            } elseif ($event->status) {
                $status = 'Active';
            } else {
                $status = 'Pending';
            }

            return [
                'id'           => $event->id,
                'title'        => $event->title,
                'description'  => $event->description,
                'location'     => $event->location,
                'date'         => $eventDate->toDateString(),
                'time'         => $event->time ? substr($event->time, 0, 5) : '',
                'price'        => $event->price,
                'maxcapacity'  => $event->maxcapacity,
                'is_active'    => (bool) $event->status,
                'image_path'   => $event->image_path,
                'attendees'    => $event->bookings_count,
                'revenue'      => round($this->parsePrice($event->price) * $event->bookings_count, 2),
                'status'       => $status,
            ];
        })->values();

        // ====== الإحصائيات ======
        $ratings = $events->whereNotNull('evaluation')->pluck('evaluation');

        $stats = [
            'total_events'    => $events->count(),
            'total_attendees' => $events->sum('bookings_count'),
            'revenue'         => round($eventsList->sum('revenue'), 2),
            'average_rating'  => $ratings->count() ? round($ratings->avg(), 1) : 0,
        ];

        // ====== الرسم البياني (آخر 7 أيام) ======
        $eventIds = $events->pluck('id');
        $days = collect(range(6, 0))->map(fn ($i) => Carbon::today()->subDays($i));

        $recentBookings = Bookings::with('event:id,price')
            ->whereIn('event_id', $eventIds)
            ->where('booking_date', '>=', Carbon::today()->subDays(6))
            ->get();

        $trends = [
            'events' => $days->map(fn ($d) =>
                $events->filter(fn ($e) => $e->created_at?->isSameDay($d))->count()
            )->values(),

            'attendees' => $days->map(fn ($d) =>
                $recentBookings->filter(fn ($b) => $b->booking_date?->isSameDay($d))->count()
            )->values(),

            'revenue' => $days->map(fn ($d) =>
                $recentBookings
                    ->filter(fn ($b) => $b->booking_date?->isSameDay($d))
                    ->sum(fn ($b) => $this->parsePrice($b->event?->price))
            )->values(),

            'rating' => $events->whereNotNull('evaluation')
                ->sortBy('id')
                ->take(-7)
                ->pluck('evaluation')
                ->values(),
        ];

        // ====== آخر النشاطات ======
        $activities = Bookings::with(['user:id,name', 'event:id,title'])
            ->whereIn('event_id', $eventIds)
            ->orderByDesc('booking_date')
            ->limit(5)
            ->get()
            ->map(fn ($b) => [
                'id'    => $b->id,
                'event' => $b->event?->title,
                'user'  => $b->user?->name,
                'time'  => $b->booking_date?->diffForHumans(),
            ]);

        return response()->json([
            'stats'      => $stats,
            'trends'     => $trends,
            'events'     => $eventsList,
            'activities' => $activities,
        ]);
    }

    public function update(Request $request, $id)
    {
        $event = Event::withCount('bookings')->find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        if (!$this->canManage($request->user(), $event)) {
            return response()->json(['message' => 'You are not allowed to edit this event'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title'       => 'sometimes|required|string|max:50',
            'description' => 'sometimes|required|string',
            'location'    => 'sometimes|required|string',
            'date'        => 'sometimes|required|date',
            'time'        => 'sometimes|required|date_format:H:i',
            'price'       => 'sometimes|required|string',
            'maxcapacity' => 'sometimes|required|integer|min:1',
            'status'      => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'message' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        // ما منسمح تنزّل السعة تحت عدد الحجوزات الحالية
        if (isset($data['maxcapacity']) && $data['maxcapacity'] < $event->bookings_count) {
            return response()->json([
                'status'  => false,
                'message' => ['maxcapacity' => ["Capacity can't be less than current bookings ({$event->bookings_count})"]],
            ], 422);
        }

        $event->update($data);

        return response()->json(['status' => true, 'message' => 'Event updated']);
    }

    public function destroy(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        if (!$this->canManage($request->user(), $event)) {
            return response()->json(['message' => 'You are not allowed to delete this event'], 403);
        }

        DB::transaction(function () use ($event) {
            // لازم نمسح الحجوزات والمفضلة أول لأنها مربوطة بـ foreign key
            $event->bookings()->delete();
            $event->favoritedBy()->detach();
            $event->delete();
        });

        if ($event->image_path) {
            File::delete(public_path($event->image_path));
        }

        return response()->json(['status' => true, 'message' => 'Event deleted']);
    }
}