<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MyBookingsController;
use App\Http\Controllers\MyEventsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;

// Public
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/counts', [UserController::class, 'count']);
Route::get('/category', [CategoriesController::class, 'index']);
Route::get('/events', [EventController::class, 'showEvent']);
Route::get('/event/{id}', [EventController::class, 'showEventDetails']);

Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});

// Protected
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Profile / Settings
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::put('/settings/password', [ProfileController::class, 'updatePassword']);
    Route::put('/settings/notifications', [ProfileController::class, 'updateNotifications']);
    Route::put('/settings/preferences', [ProfileController::class, 'updatePreferences']);

    // Favorites
    Route::post('/events/{eventId}/favorite', [FavoriteController::class, 'toggle']);
    Route::get('/events/{eventId}/favorite/check', [FavoriteController::class, 'check']);
    Route::get('/favorites', [FavoriteController::class, 'index']);

    // Booking
    Route::post('/events/{id}/book', [EventController::class, 'book']);
    Route::delete('/events/{id}/book', [MyEventsController::class, 'cancelBooking']);
    Route::get('/events/{id}/book/check', [EventController::class, 'checkBooking']);

    // My Bookings
    Route::get('/my-bookings', [MyBookingsController::class, 'index']);

    // Create event
    Route::post('/CreateEvent', [EventController::class, 'store']);

    // My Events
    Route::get('/my-events', [MyEventsController::class, 'index']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::put('/events/{id}', [DashboardController::class, 'update']);
    Route::delete('/events/{id}', [DashboardController::class, 'destroy']);
});