<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;

class TaskController extends Controller {
    protected $taskService;

    public function __construct(TaskService $taskService) {
        $this->taskService = $taskService;
    }

    public function index() {
        return TaskResource::collection($this->taskService->getAllTasks());
    }

    public function store(TaskRequest $request) {
        $task = $this->taskService->createTask($request->validated());
        return new TaskResource($task);
    }

    public function show($id) {
        return new TaskResource($this->taskService->show($id));
    }

    public function update(TaskRequest $request, $id) {
        $task = $this->taskService->updateTask($id, $request->validated());
        return new TaskResource($task);
    }

    public function destroy($id) {
        $this->taskService->deleteTask($id);
        return response()->noContent();
    }
}
