<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SharedTaskListResource extends JsonResource
{
    /**
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'task_list_id' => $this->task_list_id,
            'user_id' => $this->user_id,
            'permission' => $this->permission,
            'task_list' => new TaskListResource($this->whenLoaded('taskList')),
            'user' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
