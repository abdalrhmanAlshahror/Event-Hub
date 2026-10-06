<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{

    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'category_id', 
        'title',
        'description',
        'location',
        'date',
        'time',        // ✅ أضف
        'maxcapacity', // ✅ غير capacity إلى maxcapacity
        'price',       // ✅ أضف
        'image_path',
        'status',
        'evaluation'
    ];

    public function categories() {
        return $this->BelongsTo(Categories::class, 'category_id');
    }

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function users() {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function bookings() {
        return $this->hasMany(Bookings::class, 'event_id');
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites')->withTimestamps();
    }
}
