<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use MongoDB\BSON\ObjectId;

class ProjectController extends Controller
{
    /**
     * Listado de proyectos
     */
    public function index(Request $request): Response
    {
        $sortField = $request->input('sort_field', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $name = $request->input('name');
        $status = $request->input('status');

        $projects = Project::query()
            ->with(['createdBy', 'updatedBy'])
            ->when($name, fn ($q) => $q->where('name', 'like', "%{$name}%"))
            ->when($status, fn ($q) => $q->where('status', $status))
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => $request->query(), // ✅ NUNCA null
            'success' => session('success'),
        ]);
    }

    /**
     * Formulario de creación
     */
    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    /**
     * Guardar proyecto
     */
    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;

        $data['created_by'] = new ObjectId(Auth::id());
        $data['updated_by'] = new ObjectId(Auth::id());

        if ($image) {
            $data['image_path'] = $image->store(
                'projects/' . str_replace(' ', '_', $data['name']),
                'public'
            );
        }

        Project::create($data);

        return to_route('projects.index')
            ->with('success', 'Project created successfully.');
    }

    /**
     * Mostrar proyecto y tareas
     */
    public function show(Project $project, Request $request): Response
    {
        $sortField = $request->input('sort_field', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $name = $request->input('name');
        $status = $request->input('status');

        $tasks = $project->tasks()
            ->when($name, fn ($q) => $q->where('name', 'like', "%{$name}%"))
            ->when($status, fn ($q) => $q->where('status', $status))
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('Projects/Show', [
            'project' => new ProjectResource(
                $project->load(['createdBy', 'updatedBy'])
            ),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => $request->query(), // ✅
            'success' => session('success'),
        ]);
    }

    /**
     * Editar proyecto
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', [
            'project' => new ProjectResource(
                $project->load(['createdBy', 'updatedBy'])
            ),
        ]);
    }

    /**
     * Actualizar proyecto
     */
    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;

        $data['updated_by'] = new ObjectId(Auth::id());

        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }

            $data['image_path'] = $image->store(
                'projects/' . str_replace(' ', '_', $data['name']),
                'public'
            );
        }

        $project->update($data);

        return to_route('projects.index')
            ->with('success', "Project \"{$project->name}\" updated successfully.");
    }

    /**
     * Eliminar proyecto
     */
    public function destroy(Project $project): RedirectResponse
    {
        $name = $project->name;

        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(
                dirname($project->image_path)
            );
        }

        $project->delete();

        return to_route('projects.index')
            ->with('success', "Project \"{$name}\" deleted successfully.");
    }
}
