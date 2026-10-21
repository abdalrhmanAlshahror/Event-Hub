<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MyBookingsController extends Controller
{
    public function index(Request $request)
    {
        $today = Carbon::today();

        $bookings = Bookings::where('user_id', $request->user()->id)
            ->with('event:id,title,date,time,location,image_path,price')
            ->get()
            ->filter(fn ($b) => $b->event)
            ->map(function ($b) use ($today) {
                $eventDate = Carbon::parse($b->event->date)->startOfDay();
                $bookedAt = $b->booking_date ?? $b->created_at;

                return [
                    'id'           => $b->id,
                    // رقم الحجز بيتولّد من id الحجز، فما بنحتاج عمود جديد بالجدول
                    'code'         => 'EVH-' . ($bookedAt?->year ?? $eventDate->year) . '-' . str_pad($b->id, 6, '0', STR_PAD_LEFT),
                    'booking_date' => $bookedAt?->toDateString(),
                    'is_past'      => $eventDate->lt($today),
                    'event'        => [
                        'id'         => $b->event->id,
                        'title'      => $b->event->title,
                        'date'       => $eventDate->toDateString(),
                        'time'       => $b->event->time ? substr($b->event->time, 0, 5) : '',
                        'location'   => $b->event->location,
                        'image_path' => $b->event->image_path,
                        'price'      => $b->event->price,
                    ],
                ];
            });

        $upcoming = $bookings->where('is_past', false)->sortBy('event.date')->values();
        $past = $bookings->where('is_past', true)->sortByDesc('event.date')->values();

        return response()->json([
            'upcoming' => $upcoming,
            'past'     => $past,
        ]);
    }
}