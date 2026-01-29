<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request): Response
    {
        $sortField = $request->input('sort_field', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        $users = User::query()
            ->when($request->input('name'), fn($query, $name) => $query->where('name', 'like', "%{$name}%"))
            ->when($request->input('email'), fn($query, $email) => $query->where('email', 'like', "%{$email}%"))
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('Users/Index', [
            'users' => UserCrudResource::collection($users),
            'queryParams' => $request->query() ?: null,
            'success' => session('success') ?: '',
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created user.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);

        User::create($data);

        return to_route('users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Show the form for editing a specific user.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('Users/Edit', [
            'user' => new UserCrudResource($user),
        ]);
    }

    /**
     * Update a specific user.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return to_route('users.index')
            ->with('success', "User \"{$user->name}\" updated successfully.");
    }

    /**
     * Delete a specific user.
     */
    public function destroy(User $user): RedirectResponse
    {
        $name = $user->name;
        $user->delete();

        return to_route('users.index')
            ->with('success', "User \"{$name}\" deleted successfully.");
    }
}
