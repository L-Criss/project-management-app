import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextareaInput from "@/Components/TextareaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import { PROJECT_STATUSES_TEXT_MAP } from "@/constants.jsx";

export default function Create({ auth }) {

  const { data, setData, post, errors, reset } = useForm({
    image: null,          // ✅ null, no string
    name: '',
    status: 'pending',
    description: '',
    due_date: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route('projects.store'), {
      forceFormData: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <AuthenticatedLayout
      user={auth?.user}   // ✅ PROTEGIDO
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Create New Project
          </h2>
        </div>
      }
    >
      <Head title="Create New Project" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
            >

              {/* Project Image */}
              <div>
                <InputLabel htmlFor="project_image_path" value="Project Image" />
                <TextInput
                  id="project_image_path"
                  type="file"
                  onChange={(e) => setData('image', e.target.files[0] ?? null)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              {/* Project Name */}
              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name" />
                <TextInput
                  id="project_name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  isFocused
                  className="mt-1 block w-full"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Description */}
              <div className="mt-4">
                <InputLabel htmlFor="project_description" value="Project Description" />
                <TextareaInput
                  id="project_description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              {/* Due Date */}
              <div className="mt-4">
                <InputLabel htmlFor="project_due_date" value="Project Due Date" />
                <TextInput
                  id="project_due_date"
                  type="date"
                  value={data.due_date}
                  onChange={(e) => setData('due_date', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              {/* Status */}
              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Project Status" />
                <SelectInput
                  id="project_status"
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  className="mt-1 block w-full"
                >
                  <option value="">Select Status</option>
                  {Object.entries(PROJECT_STATUSES_TEXT_MAP).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>

              {/* Buttons */}
              <div className="mt-4 text-right">
                <Link
                  href={route("projects.index")}
                  className="bg-gray-100 py-1.5 px-3 text-gray-800 rounded shadow hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="bg-emerald-500 py-1 px-3 text-white rounded shadow hover:bg-emerald-600"
                >
                  Create
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
