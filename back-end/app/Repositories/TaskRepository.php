<?php

namespace App\Repositories;

use App\Models\Tasks;

class TaskRepository extends BaseRepository
{
    protected $task;

    public function __construct(Tasks $task) {
        parent::__construct($task);
    }
}