<?php

namespace App\Http\Controllers;

use App\Models\Cities;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function count() {

        $eventCount = Event::where('status', true)->count();
        $citiesCount = Cities::count();
        $userCount = User::where('role', 'attendee')->count();

        return response()->json([
            'Event_count' => $eventCount,
            'Cities_count' => $citiesCount,
            'User_count' => $userCount
        ]);
    }
}
