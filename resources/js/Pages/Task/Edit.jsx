import { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import InputError from "@/Components/InputError";
import Select from "react-select";

export default function Edit({ auth, task, projects, users }) {
  console.log("Task received: ", task);

  // Form data
  const { data, setData, post, errors } = useForm({
    image: "",
    name: task.name || "",
    status: task.status || "",
    description: task.description || "",
    due_date: task.due_date || "",
    priority: task.priority || "",
    assigned_user_id: task.assigned_user_id || "",
    project_id: task.project_id || "",
    _method: "PUT",
  });

  // Options for react-select (usar id, no _id)
  const projectOptions = projects.data.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const userOptions = users.data.map((u) => ({
    value: u.id,
    label: u.name,
  }));

  // Selected options
  const [selectedProject, setSelectedProject] = useState(
    projectOptions.find((p) => p.value === task.project_id) || null
  );

  const [selectedUser, setSelectedUser] = useState(
    userOptions.find((u) => u.value === task.assigned_user_id) || null
  );

  // Handle submit
  const onSubmit = (e) => {
    e.preventDefault();

    // Actualizar datos antes de enviar
    setData("project_id", selectedProject ? selectedProject.value : "");
    setData("assigned_user_id", selectedUser ? selectedUser.value : "");

    // Enviar formulario vía Ziggy
    post(route("tasks.update", { task: task.id }));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Edit Task "{task.name}"
          </h2>
        </div>
      }
    >
      <Head title="Edit Task" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              {/* Mostrar imagen actual */}
              {task.image_path && (
                <div className="mb-4">
                  <img src={task.image_path} className="w-64" alt={task.name} />
                </div>
              )}

              {/* Project */}
              <div className="mt-4">
                <InputLabel htmlFor="task_project" value="Project" />
                <Select
                  id="task_project"
                  options={projectOptions}
                  value={selectedProject}
                  onChange={setSelectedProject}
                  placeholder="Select Project"
                />
                <InputError message={errors.project_id} className="mt-2" />
              </div>

              {/* Assigned User */}
              <div className="mt-4">
                <InputLabel htmlFor="task_user" value="Assigned User" />
                <Select
                  id="task_user"
                  options={userOptions}
                  value={selectedUser}
                  onChange={setSelectedUser}
                  placeholder="Select User"
                />
                <InputError message={errors.assigned_user_id} className="mt-2" />
              </div>

              {/* Task Name */}
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Task Name" />
                <TextInput
                  id="task_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Task Description */}
              <div className="mt-4">
                <InputLabel htmlFor="task_description" value="Task Description" />
                <TextareaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              {/* Task Deadline */}
              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              {/* Task Status */}
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Status" />
                <select
                  id="task_status"
                  value={data.status}
                  className="mt-1 block w-full rounded border-gray-300"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <InputError message={errors.status} className="mt-2" />
              </div>

              {/* Task Priority */}
              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Task Priority" />
                <select
                  id="task_priority"
                  value={data.priority}
                  className="mt-1 block w-full rounded border-gray-300"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <InputError message={errors.priority} className="mt-2" />
              </div>

              {/* Task Image */}
              <div className="mt-4">
                <InputLabel htmlFor="task_image" value="Task Image" />
                <TextInput
                  id="task_image"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              {/* Buttons */}
              <div className="mt-4 text-right">
                <Link
                  href={route("tasks.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="bg-emerald-500 py-1 px-3 text-white rounded shadow hover:bg-emerald-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
