<?php

namespace Database\Factories;

use App\Models\Categories;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

use function Laravel\Prompts\number;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $eventNames = [
            'Tech Innovators Summit', 
            'UI/UX Design Bootcamp', 
            'Global Startup Weekend', 
            'Green Energy Expo', 
            'CyberSecurity Hackathon',
            'FinTech Future Forum',
            'Mobile App Dev Con'
        ];

        $priceOptions = [
            'Free',
            '$' . fake()->randomFloat(2, 10, 50),  
            '$' . fake()->randomFloat(2, 60, 200),
            'Contact for Price',
            'Starting from $' . fake()->numberBetween(5, 20),
        ];

        return [

            'organizer_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'category_id' => Categories::inRandomOrder()->first()?->id ?? Categories::factory(),
            'title' => fake()->randomElement($eventNames),
            'description' => fake()->sentence(15),
            'location' => fake()->city() . ' ' . fake()->streetName() . ' Venue',
            'date' => fake()->dateTimeBetween('now', '+1 year'),
            'time' => fake()->dateTime('now'),
            'price' => fake()->randomElement($priceOptions),
            'maxcapacity' => fake()->numberBetween(1, 100),
            'evaluation' => fake()->numberBetween(1, 5),
            'image_path'   => 'https://picsum.photos/seed/' . fake()->uuid . '/640/480',
        ];
    }
}
