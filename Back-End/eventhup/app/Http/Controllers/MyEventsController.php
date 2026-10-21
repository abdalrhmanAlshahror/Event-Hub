<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MyEventsController extends Controller
{
    private function formatEvent(Event $event, Carbon $today): array
    {
        $eventDate = Carbon::parse($event->date)->startOfDay();

        if ($eventDate->lt($today)) {
            $status = 'Past Events';
        } elseif ($event->status) {
            $status = 'Active';
        } else {
            $status = 'Pending Approval';
        }

        $sold = $event->bookings_count;
        $capacity = (int) $event->maxcapacity;
        $percent = $capacity > 0 ? min(100, (int) round(($sold / $capacity) * 100)) : 0;

        return [
            'id'          => $event->id,
            'title'       => $event->title,
            'description' => $event->description,
            'location'    => $event->location,
            'date'        => $eventDate->toDateString(),
            'time'        => $event->time ? substr($event->time, 0, 5) : '',
            'price'       => $event->price,
            'maxcapacity' => $capacity,
            'is_active'   => (bool) $event->status,
            'image_path'  => $event->image_path,
            'tickets_sold' => $sold,
            'percent'     => $percent,
            'status'      => $status,
        ];
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $today = Carbon::today();

        // الفعاليات اللي أنشأها المستخدم
        $created = Event::where('organizer_id', $user->id)
            ->withCount('bookings')
            ->orderByDesc('date')
            ->get()
            ->map(fn ($event) => $this->formatEvent($event, $today))
            ->values();

        // الفعاليات اللي حاجز فيها المستخدم
        $attendingIds = Bookings::where('user_id', $user->id)->pluck('event_id');

        $attending = Event::whereIn('id', $attendingIds)
            ->withCount('bookings')
            ->orderByDesc('date')
            ->get()
            ->map(fn ($event) => $this->formatEvent($event, $today))
            ->values();

        return response()->json([
            'role'      => $user->role,
            'created'   => $created,
            'attending' => $attending,
        ]);
    }

    public function cancelBooking(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        if (Carbon::parse($event->date)->startOfDay()->lt(Carbon::today())) {
            return response()->json(['message' => "You can't cancel a booking for a past event"], 422);
        }

        $deleted = Bookings::where('user_id', $request->user()->id)
            ->where('event_id', $id)
            ->delete();

        if (!$deleted) {
            return response()->json(['message' => "You don't have a booking for this event"], 404);
        }

        return response()->json(['status' => true, 'message' => 'Booking cancelled']);
    }
}