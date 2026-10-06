<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    /**
     * إضافة/إزالة فعالية من المفضلة (toggle)
     */
    public function toggle(Request $request, $eventId)
    {
        $user = $request->user(); // لازم يكون المستخدم مسجل دخول

        $event = Event::findOrFail($eventId);

        if ($user->favoriteEvents()->where('event_id', $eventId)->exists()) {
            // موجودة بالمفضلة -> احذفها
            $user->favoriteEvents()->detach($eventId);
            return response()->json(['favorited' => false]);
        } else {
            // مش موجودة -> ضيفها
            $user->favoriteEvents()->attach($eventId);
            return response()->json(['favorited' => true]);
        }
    }

    /**
     * تحقق إذا الفعالية موجودة بمفضلة المستخدم الحالي
     */
    public function check(Request $request, $eventId)
    {
        $user = $request->user();

        $favorited = $user->favoriteEvents()->where('event_id', $eventId)->exists();

        return response()->json(['favorited' => $favorited]);
    }

    /**
     * كل الفعاليات المفضلة عند المستخدم الحالي
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'favorites' => $user->favoriteEvents()->get()
        ]);
    }
}