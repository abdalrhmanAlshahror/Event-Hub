<?php

namespace Database\Seeders;

use App\Models\Cities;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            EventSeeder::class,
            UserSeeder::class,
            CategoriesSeeder::class,
            BookingsSeeder::class,
            CitiesSeeder::class,
        ]);
    }
}
