<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'profile_photo',
        'bio',
        'notify_email',
        'notify_reminders',
        'notify_promotions',
        'notify_newsletter',
        'language',
        'timezone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'notify_email'      => 'boolean',
        'notify_reminders'  => 'boolean',
        'notify_promotions' => 'boolean',
        'notify_newsletter' => 'boolean',
    ];

    public function bookings() {
        return $this->hasMany(Bookings::class, 'user_id');
    }

    public function events()
    {
        return $this->hasMany(Event::class, 'organizer_id');
    }

    public function favoriteEvents()
    {
        return $this->belongsToMany(Event::class, 'favorites')->withTimestamps();
    }
}