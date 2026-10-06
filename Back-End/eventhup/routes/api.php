<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;

// Public
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/events/{eventId}/favorite', [FavoriteController::class, 'toggle']);
    Route::get('/events/{eventId}/favorite/check', [FavoriteController::class, 'check']);
    Route::get('/favorites', [FavoriteController::class, 'index']);
});

Route::get('/counts', [UserController::class, 'count']);
Route::get('/category', [CategoriesController::class, 'index']);
Route::get('/events', [EventController::class, 'showEvent']);
Route::post('/CreateEvent', [EventController::class, 'store']);
Route::get('/event/{id}', [EventController::class, 'showEventDetails']);

Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});