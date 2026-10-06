<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function showEvent()
    {
        $events = Event::select([
            'id',
            'category_id',
            'image_path',
            'evaluation',
            'title',
            'date',
            'location'
        ])->with(['Categories' => function($query) {
            $query->select('id', 'name'); 
        }])->get();

        return response()->json([
            'Event' => $events
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'category_id'  => (int) $request->category_id,
            'maxcapacity'  => (int) $request->maxcapacity,
            'organizer_id' => 1, // ✅ مؤقت حتى تضيف الـ Authentication
        ]);

        $validator = Validator::make($request->all(), [
            'title'        => 'required|string|max:50',
            'description'  => 'required|string',
            'category_id'  => 'required|integer|exists:categories,id',
            'date'         => 'required|date',
            'time'         => 'required|date_format:H:i',
            'location'     => 'required|string',
            'price'        => 'required|string',
            'maxcapacity'  => 'required|integer',
            'image_path'   => 'required|file|mimes:jpg,jpeg,png|max:10240',
            'organizer_id' => 'required|integer',
            'evaluation'   => 'nullable|integer|min:1|max:5',
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
            'organizer_id' => $request->organizer_id, // ✅
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
            'users' => function($query) {
                $query->select('users.id', 'name', 'profile_photo'); // ✅ ضفنا الصورة
            },
            'organizer' => function($query) {
                $query->select('id', 'name', 'profile_photo')->withCount('events'); // ✅ ضفنا الصورة
            },
            'categories' => function($query) {
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
                'profile_photo' => $event->organizer ? $event->organizer->profile_photo : null, // ✅
                'total_events' => $event->organizer ? $event->organizer->events_count : 0,
            ],
            'remaining_seats' => $remainingSeats
        ]);
    }
}