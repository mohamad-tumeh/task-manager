<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\TaskListRepository;
use App\Repositories\TaskRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(TaskListRepository::class, function ($app) {
            return new TaskListRepository(new \App\Models\TaskList);
        });

        $this->app->bind(TaskRepository::class, function ($app) {
            return new TaskRepository(new \App\Models\Tasks);
        });
    }

    public function boot() {}
}
