<?php 

namespace App\Services;

use App\Repositories\TaskListRepository;

class TaskListService {
    protected $taskListRepository;

    public function __construct(TaskListRepository $taskListRepository) {
        $this->taskListRepository = $taskListRepository;
    }

    public function createTaskList(array $data) {
        
        return $this->taskListRepository->create($data);
    }

    public function getAllTaskLists() {
        return $this->taskListRepository->getWithRelation(['tasks', 'sharedUsers', 'owner']);
    }

    public function show($id)
    {
        return $this->taskListRepository->getByIdWithRelation($id, ['tasks']);
    }

    public function updateTaskList($id, array $data) {
        return $this->taskListRepository->update($id, $data);
    }

    public function deleteTaskList($id) {
        return $this->taskListRepository->delete($id);
    }
}