import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextareaInput from "@/Components/TextareaInput";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth, projects, users }) {

  const { data, setData, post, errors } = useForm({
    image: null,
    name: "",
    status: "",
    description: "",
    due_date: "",
    priority: "",
    assigned_user_id: "",
    project_id: ""
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('tasks.store'));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Create New Task
        </h2>
      }
    >
      <Head title="Create Task" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm sm:rounded-lg p-6">

            <form onSubmit={onSubmit} className="space-y-4">

              {/* PROJECT */}
              <div>
                <InputLabel value="Project" />
                <SelectInput
                  value={data.project_id}
                  onChange={(e) => setData("project_id", e.target.value)}
                  className="w-full"
                >
                  <option value="">Select project</option>
                  {projects?.data?.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.project_id} />
              </div>

              {/* IMAGE */}
              <div>
                <InputLabel value="Image" />
                <TextInput
                  type="file"
                  onChange={(e) => setData("image", e.target.files[0])}
                  className="w-full"
                />
                <InputError message={errors.image} />
              </div>

              {/* NAME */}
              <div>
                <InputLabel value="Task Name" />
                <TextInput
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className="w-full"
                />
                <InputError message={errors.name} />
              </div>

              {/* DESCRIPTION */}
              <div>
                <InputLabel value="Description" />
                <TextareaInput
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  className="w-full"
                />
              </div>

              {/* DUE DATE */}
              <div>
                <InputLabel value="Due Date" />
                <TextInput
                  type="date"
                  value={data.due_date}
                  onChange={(e) => setData("due_date", e.target.value)}
                />
              </div>

              {/* STATUS */}
              <div>
                <InputLabel value="Status" />
                <SelectInput
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </div>

              {/* PRIORITY */}
              <div>
                <InputLabel value="Priority" />
                <SelectInput
                  value={data.priority}
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
              </div>

              {/* ASSIGNED USER */}
              <div>
                <InputLabel value="Assigned User" />
                <SelectInput
                  value={data.assigned_user_id}
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Select user</option>
                  {users?.data?.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2">
                <Link
                  href={route("tasks.index")}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Cancel
                </Link>
                <button className="px-3 py-1 bg-emerald-500 text-white rounded">
                  Save
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
