<?php

namespace App\Repositories;

use App\Models\TaskList;

class TaskListRepository extends BaseRepository
{
    protected $taskList;
    public function __construct(TaskList $taskList) {
        parent::__construct($taskList); 
    }
    
}