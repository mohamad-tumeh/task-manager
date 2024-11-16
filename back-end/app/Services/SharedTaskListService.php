<?php

namespace App\Services;

use App\Repositories\SharedTaskListRepository;

class SharedTaskListService
{
    protected $sharedTaskListRepository;

    public function __construct(SharedTaskListRepository $sharedTaskListRepository)
    {
        $this->sharedTaskListRepository = $sharedTaskListRepository;
    }

    public function getSharedTaskLists()
    {
        return $this->sharedTaskListRepository->getWithRelation(['taskList', 'taskList.owner']);
    }

    public function shareTaskList($taskListId, $userId, $permission)
    {
        return $this->sharedTaskListRepository->shareTaskList($taskListId, $userId, $permission);
    }

    public function revokeAccess($taskListId, $userId)
    {
        return $this->sharedTaskListRepository->revokeAccess($taskListId, $userId);
    }
}
