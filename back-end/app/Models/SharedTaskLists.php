<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SharedTaskLists extends Model
{
    protected $fillable = ['task_list_id', 'user_id', 'permission'];

    public function taskList()
    {
        return $this->belongsTo(TaskList::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
