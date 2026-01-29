import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput.jsx";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, useForm} from "@inertiajs/react";

export default function Edit({auth, project}) {
  const {data, setData, post, errors} = useForm({
    image: "",
    name: project.name || "",
    status: project.status || "pending", // valor inicial si no existe
    description: project.description || "",
    due_date: project.due_date || "",
    _method: "PUT", // importante para actualización
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("projects.update", project.id), {
      forceFormData: true, // necesario para enviar archivos
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Edit Project "{project.name}"
          </h2>
        </div>
      }
    >
      <Head title={`Edit Project ${project.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
            >
              {/* Imagen existente */}
              {project.image_path && (
                <div className="mb-4">
                  <img
                    src={project.image_path}
                    className="w-64"
                    alt={`Project ${project.name}`}
                  />
                </div>
              )}

              {/* Imagen nueva */}
              <div>
                <InputLabel htmlFor="project_image_path" value="Project Image" />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              {/* Nombre */}
              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name" />
                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Descripción */}
              <div className="mt-4">
                <InputLabel htmlFor="project_description" value="Project Description" />
                <TextareaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              {/* Fecha límite */}
              <div className="mt-4">
                <InputLabel htmlFor="project_due_date" value="Project Due Date" />
                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              {/* Estado */}
              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Project Status" />
                <SelectInput
                  name="status"
                  id="project_status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>

              {/* Botones */}
              <div className="mt-4 text-right">
                <Link
                  href={route("projects.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button
                  className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
                  Update
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
