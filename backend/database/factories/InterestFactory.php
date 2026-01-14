<?php

namespace Database\Factories;

use App\Models\Interest;
use Illuminate\Database\Eloquent\Factories\Factory;

class InterestFactory extends Factory
{
    protected $model = Interest::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word(),
        ];
    }
}
