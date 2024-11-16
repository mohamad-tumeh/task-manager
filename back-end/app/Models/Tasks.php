<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $fillable = ['task_list_id', 'description', 'is_completed'];

    public function taskList()
    {
        return $this->belongsTo(TaskList::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sharedWith()
    {
        return $this->belongsToMany(User::class, 'shared_tasks', 'task_id', 'user_id')
            ->withPivot('permission');
    }
}
