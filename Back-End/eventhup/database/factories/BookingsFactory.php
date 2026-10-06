<?php

namespace Database\Factories;

use App\Models\Bookings;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Bookings>
 */
class BookingsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()->id ?? \App\Models\User::factory(),
            'event_id' => \App\Models\Event::inRandomOrder()->first()->id ?? \App\Models\Event::factory(),
            'booking_date' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
