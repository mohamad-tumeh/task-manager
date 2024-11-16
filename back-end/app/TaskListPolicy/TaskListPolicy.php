<?php

namespace App\Policies;

use App\Models\User;
use App\Models\TaskList;

class TaskListPolicy
{
    public function view(User $user, TaskList $taskList)
    {
        return $taskList->user_id === $user->id || $user->sharedTaskLists()->where('task_list_id', $taskList->id)->exists();
    }

    public function edit(User $user, TaskList $taskList)
    {
        $sharedList = $user->sharedTaskLists()->where('task_list_id', $taskList->id)->first();
        return $taskList->user_id === $user->id || ($sharedList && $sharedList->pivot->permission === 'edit');
    }
}
