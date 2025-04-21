<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::factory()->count(4)->create();
        return [
            'title' => fake()->name(),
            'description' =>fake()->paragraph(),
            'status' => fake()->randomElement(['To-Do','Completed','In-Progress']),
            'deadline' => fake()->date(),
            'user_id' =>User::factory()->create()->id,
        ];
    }
    public function configure()
    {
        return $this->afterCreating(function (Task $task) {
            // Attache entre 1 et 3 membres assignés à chaque tâche
            $users = User::inRandomOrder()->take(rand(1, 3))->pluck('id');
            $task->assignedMembers()->attach($users);
        });
    }

}
