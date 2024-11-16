<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskListRequest;
use App\Http\Resources\TaskListResource;
use App\Services\TaskListService;
use Illuminate\Support\Facades\Auth;

class TaskListController extends Controller
{
    protected $taskListService;

    public function __construct(TaskListService $taskListService)
    {
        $this->taskListService = $taskListService;
    }

    public function index()
    {
        return TaskListResource::collection($this->taskListService->getAllTaskLists());
    }

    public function store(TaskListRequest $request)
    {
        $validated =  $request->validated();
        $data = array_merge($validated, ['user_id' => Auth::id()]);
        $taskList = $this->taskListService->createTaskList($data);
        return new TaskListResource($taskList);
    }

    public function show($id)
    {
        return new TaskListResource($this->taskListService->show($id));
    }

    public function update(TaskListRequest $request, $id)
    {
        $taskList = $this->taskListService->updateTaskList($id, $request->validated());
        return new TaskListResource($taskList);
    }

    public function destroy($id)
    {
        $this->taskListService->deleteTaskList($id);
        return response()->noContent();
    }
}
