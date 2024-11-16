<?php

namespace App\Repositories;

use App\Models\SharedTaskLists;

class SharedTaskListRepository extends BaseRepository
{
    public function __construct(SharedTaskLists $sharedTaskList)
    {
        parent::__construct($sharedTaskList);
    }

    public function shareTaskList($taskListId, $userId, $permission)
    {
        return $this->model->updateOrCreate(
            ['task_list_id' => $taskListId, 'user_id' => $userId],
            ['permission' => $permission]
        );
    }

    public function revokeAccess($taskListId, $userId)
    {
        return $this->model->where('task_list_id', $taskListId)->where('user_id', $userId)->delete();
    }

}
