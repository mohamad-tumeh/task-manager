<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskListResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'owner' => new UserResource($this->whenLoaded('owner')), 
            'tasks' => TaskResource::collection($this->whenLoaded('tasks')),
            'shared_users' => UserResource::collection($this->whenLoaded('sharedUsers')),
            
        ];
    }
}
