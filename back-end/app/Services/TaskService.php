<?php
namespace App\Services;

use App\Repositories\TaskRepository;

class TaskService {
    protected $taskRepository;

    public function __construct(TaskRepository $taskRepository) {
        $this->taskRepository = $taskRepository;
    }

    public function createTask(array $data) {
        return $this->taskRepository->create($data);
    }

    public function getAllTasks() {
        return $this->taskRepository->getWithRelation(['taskList', 'sharedWith']);
    }

    public function show($id)
    {
        return $this->taskRepository->getByIdWithRelation($id, ['taskList','sharedWith', 'owner']);
    }

    public function updateTask($id, array $data) {
        return $this->taskRepository->update($id, $data);
    }

    public function deleteTask($id) {
        return $this->taskRepository->delete($id);
    }

    public function markTaskComplete($id) {
        return $this->taskRepository->update($id, ['is_completed' => true]);
    }

    public function markTaskIncomplete($id) {
        return $this->taskRepository->update($id, ['is_completed' => false]);
    }
}