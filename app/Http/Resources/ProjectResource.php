<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,

            'name' => $this->name,
            'description' => $this->description,

            'status' => $this->status,

            'due_date' => $this->due_date
                ? Carbon::make($this->due_date)?->format('Y-m-d')
                : null,

            'image_path' => $this->image_path
                ? Storage::url($this->image_path)
                : null,

            'createdBy' => $this->whenLoaded(
                'createdBy',
                fn () => $this->createdBy
                    ? new UserResource($this->createdBy)
                    : null
            ),

            'updatedBy' => $this->whenLoaded(
                'updatedBy',
                fn () => $this->updatedBy
                    ? new UserResource($this->updatedBy)
                    : null
            ),

            'created_at' => $this->created_at
                ? Carbon::make($this->created_at)?->format('Y-m-d')
                : null,
        ];
    }
}
