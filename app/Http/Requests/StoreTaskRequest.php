<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'description' => ['nullable', 'string'],

            'image' => ['nullable', 'image', 'max:2048'],

            'due_date' => ['nullable', 'date'],

            'status' => [
                'required',
                Rule::in(['pending', 'in_progress', 'completed']),
            ],

            'priority' => [
                'required',
                Rule::in(['low', 'medium', 'high']),
            ],

            // MongoDB usa STRING (_id)
            'project_id' => ['required', 'string'],

            'assigned_user_id' => ['required', 'string'],
        ];
    }
}
