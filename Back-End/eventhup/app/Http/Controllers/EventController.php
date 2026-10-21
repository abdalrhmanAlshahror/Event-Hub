<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function showEvent()
    {
        $events = Event::select([
            'id',
            'organizer_id',
            'category_id',
            'image_path',
            'evaluation',
            'title',
            'date',
            'location',
            'price'
        ])->with([
            'categories' => function ($query) {
                $query->select('id', 'name');
            },
            'organizer' => function ($query) {
                $query->select('id', 'name', 'profile_photo');
            }
        ])->get();

        return response()->json([
            'Event' => $events
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        if (!in_array($user->role, ['admin', 'organizer'])) {
            return response()->json([
                'status'  => false,
                'message' => 'Only organizers can create events'
            ], 403);
        }

        $request->merge([
            'category_id' => (int) $request->category_id,
            'maxcapacity' => (int) $request->maxcapacity,
        ]);

        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:50',
            'description' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'date'        => 'required|date',
            'time'        => 'required|date_format:H:i',
            'location'    => 'required|string',
            'price'       => 'required|string',
            'maxcapacity' => 'required|integer',
            'image_path'  => 'required|file|mimes:jpg,jpeg,png|max:10240',
            'evaluation'  => 'nullable|integer|min:1|max:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'message' => $validator->errors()
            ], 422);
        }

        $imagePath = null;

        if ($request->hasFile('image_path')) {
            $file      = $request->file('image_path');
            $extension = $file->getClientOriginalExtension();
            $filename  = time() . '_' . Str::uuid() . '.' . $extension;

            $file->move(public_path('images'), $filename);
            $imagePath = 'images/' . $filename;
        }

        $event = Event::create([
            'title'        => $request->title,
            'description'  => $request->description,
            'category_id'  => $request->category_id,
            'date'         => $request->date,
            'time'         => $request->time,
            'location'     => $request->location,
            'price'        => $request->price,
            'maxcapacity'  => $request->maxcapacity,
            'image_path'   => $imagePath,
            'organizer_id' => $user->id,
            'evaluation'   => $request->evaluation
        ]);

        return response()->json([
            'status'  => true,
            'message' => $event
        ], 201);
    }

    public function showEventDetails($id)
    {
        $event = Event::select([
            'id',
            'organizer_id',
            'category_id',
            'title',
            'description',
            'location',
            'date',
            'time',
            'price',
            'maxcapacity',
            'image_path',
            'status',
            'evaluation'
        ])
        ->withCount('users')
        ->with([
            'users' => function ($query) {
                $query->select('users.id', 'name', 'profile_photo');
            },
            'organizer' => function ($query) {
                $query->select('id', 'name', 'profile_photo')->withCount('events');
            },
            'categories' => function ($query) {
                $query->select('id', 'name');
            }
        ])
        ->find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $remainingSeats = max(0, $event->maxcapacity - $event->users_count);

        return response()->json([
            'event' => $event,
            'organizer' => [
                'name' => $event->organizer ? $event->organizer->name : null,
                'profile_photo' => $event->organizer ? $event->organizer->profile_photo : null,
                'total_events' => $event->organizer ? $event->organizer->events_count : 0,
            ],
            'remaining_seats' => $remainingSeats
        ]);
    }

    public function book(Request $request, $id)
    {
        $user = $request->user();

        return DB::transaction(function () use ($id, $user) {
            // lockForUpdate بيمنع شخصين يحجزوا آخر مقعد بنفس اللحظة
            $event = Event::lockForUpdate()->find($id);

            if (!$event) {
                return response()->json(['message' => 'Event not found'], 404);
            }

            $alreadyBooked = Bookings::where('user_id', $user->id)
                ->where('event_id', $event->id)
                ->exists();

            if ($alreadyBooked) {
                return response()->json(['message' => 'You already booked this event'], 409);
            }

            $bookedCount = Bookings::where('event_id', $event->id)->count();

            if ($bookedCount >= $event->maxcapacity) {
                return response()->json(['message' => 'This event is sold out'], 422);
            }

            Bookings::create([
                'user_id'      => $user->id,
                'event_id'     => $event->id,
                'booking_date' => now(),
            ]);

            return response()->json([
                'status'          => true,
                'message'         => 'Booked successfully',
                'remaining_seats' => max(0, $event->maxcapacity - ($bookedCount + 1)),
            ], 201);
        });
    }

    public function checkBooking(Request $request, $id)
    {
        $booked = Bookings::where('user_id', $request->user()->id)
            ->where('event_id', $id)
            ->exists();

        return response()->json(['booked' => $booked]);
    }
}