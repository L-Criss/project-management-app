<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'description' => ['nullable', 'string'],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048', // 2MB
            ],

            'due_date' => ['nullable', 'date'],

            'status' => [
                'required',
                'string',
                Rule::in(['pending', 'in_progress', 'completed']),
            ],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->due_date === '') {
            $this->merge([
                'due_date' => null,
            ]);
        }
    }

    /**
     * Custom messages (opcional pero útil)
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Project name is required.',
            'name.max' => 'Project name may not exceed 255 characters.',

            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'Allowed image formats: jpg, jpeg, png, webp.',
            'image.max' => 'Image size must be less than 2MB.',

            'status.in' => 'Invalid project status.',
            'due_date.date' => 'Due date must be a valid date.',
        ];
    }
}
