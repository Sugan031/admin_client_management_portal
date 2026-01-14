<?php

namespace Database\Seeders;

use App\Models\Interest;
use Illuminate\Database\Seeder;

class InterestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $interests = [
            'Reading',
            'Cooking',
            'Watching TV',
            'Basketball',
        ];

        foreach ($interests as $name) {
            Interest::factory()->create([
                'name' => $name,
            ]);
        }
    }
}
