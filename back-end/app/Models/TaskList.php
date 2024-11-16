<?php

namespace App\Models;

use Illuminate\Console\View\Components\Task;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    protected $fillable = ['title', 'user_id'];
    
    public function tasks()
    {
        return $this->hasMany(Tasks::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function sharedUsers()
    {
        return $this->belongsToMany(User::class, 'shared_task_lists')
                    ->withPivot('permission') 
                    ->withTimestamps();
    }

}
