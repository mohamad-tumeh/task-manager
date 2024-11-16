<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShareTaskListRequest;
use App\Http\Resources\SharedTaskListResource;
use App\Services\SharedTaskListService;
use Illuminate\Http\Response;

class SharedTaskListsController extends Controller
{
    protected $sharedTaskListService;

    public function __construct(SharedTaskListService $sharedTaskListService) {
        $this->sharedTaskListService = $sharedTaskListService;
    }

    public function getSharedTaskLists() {
        return SharedTaskListResource::collection($this->sharedTaskListService->getSharedTaskLists());
    }

    public function share(ShareTaskListRequest $request) {
        $this->sharedTaskListService->shareTaskList(
            $request->task_list_id,
            $request->user_id,
            $request->permission
        );

        return response()->json(['message' => 'Task list shared successfully'], Response::HTTP_OK);
    }

    public function revoke(ShareTaskListRequest $request) {
        $this->sharedTaskListService->revokeAccess($request->task_list_id, $request->user_id);

        return response()->json(['message' => 'Access revoked successfully'], Response::HTTP_OK);
    }
}
