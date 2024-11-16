<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource {
    public function toArray($request) {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'is_completed' => $this->is_completed,
            'task_list_id' => $this->task_list_id,
            'owner' => new UserResource($this->whenLoaded('owner')),
            'shared_with' => UserResource::collection($this->whenLoaded('sharedWith')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
