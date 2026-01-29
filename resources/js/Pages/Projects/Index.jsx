import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import { PROJECT_STATUSES_CLASS_MAP, PROJECT_STATUSES_TEXT_MAP } from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";

export default function Index({ auth, projects, queryParams = {}, success }) {

  const cleanQueryParams = (params) => {
    return Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== null && value !== undefined && value !== ''
      )
    );
  };

  const searchFieldChange = (field, value) => {
    const newParams = {
      ...queryParams,
      [field]: value || undefined,
    };

    router.get(route('projects.index'), cleanQueryParams(newParams), {
      preserveState: true,
    });
  };

  const onKeyPress = (field, e) => {
    if (e.key === 'Enter') {
      searchFieldChange(field, e.target.value);
    }
  };

  const sortChange = (field) => {
    const newParams = { ...queryParams };

    if (newParams.sort_field === field) {
      newParams.sort_order =
        newParams.sort_order === 'asc' ? 'desc' : 'asc';
    } else {
      newParams.sort_field = field;
      newParams.sort_order = 'asc';
    }

    router.get(route('projects.index'), cleanQueryParams(newParams), {
      preserveState: true,
    });
  };

  const deleteProject = (project) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    router.delete(route('projects.destroy', project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth?.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Projects
          </h2>
          <Link
            href={route('projects.create')}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          {success && (
            <div className="bg-emerald-500 mb-4 py-2 px-4 text-white rounded">
              {success}
            </div>
          )}

          <div className="bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 overflow-auto">

              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2">
                  <tr>
                    <TableHeading name="id" {...queryParams} sortChange={sortChange}>ID</TableHeading>
                    <th className="px-3 py-3">Image</th>
                    <TableHeading name="name" {...queryParams} sortChange={sortChange}>Name</TableHeading>
                    <TableHeading name="status" {...queryParams} sortChange={sortChange}>Status</TableHeading>
                    <TableHeading name="created_at" {...queryParams} sortChange={sortChange}>Create Date</TableHeading>
                    <TableHeading name="due_date" {...queryParams} sortChange={sortChange}>Due Date</TableHeading>
                    <th className="px-3 py-3">Created By</th>
                    <th className="px-3 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {projects?.data
                    ?.filter(p => p !== null)
                    .map((project) => (
                      <tr key={project.id} className="border-b">
                        <td className="px-3 py-2">{project.id}</td>

                        <td className="px-3 py-2">
                          <img
                            src={project.image_path || '/placeholder.png'}
                            alt={project?.name ?? 'Project'}
                            width={60}
                          />
                        </td>

                        <td className="px-3 py-2 hover:underline">
                          <Link href={route('projects.show', project.id)}>
                            {project?.name ?? ''}
                          </Link>
                        </td>

                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              PROJECT_STATUSES_CLASS_MAP[project.status]
                            }`}
                          >
                            {PROJECT_STATUSES_TEXT_MAP[project.status]}
                          </span>
                        </td>

                        <td className="px-3 py-2">{project.created_at ?? '-'}</td>
                        <td className="px-3 py-2">{project.due_date ?? '-'}</td>

                        <td className="px-3 py-2">
                          {project.createdBy?.name ?? 'Unknown'}
                        </td>

                        <td className="px-3 py-2 text-right">
                          <Link
                            href={route('projects.edit', project.id)}
                            className="text-blue-600 mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteProject(project)}
                            className="text-red-600 mx-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <Pagination links={projects?.meta?.links || []} />

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
