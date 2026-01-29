import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUSES_CLASS_MAP, PROJECT_STATUSES_TEXT_MAP } from "@/constants.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Show({ auth, project, tasks, queryParams, success }) {
  const projectId = project.id || project._id;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Project "${project.name}"`}</h2>
          <Link
            href={route('projects.edit', projectId)}
            className="bg-amber-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-amber-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Project "${project.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 mb-4 py-2 px-4 text-white rounded">
              {success}
            </div>
          )}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={project.image_path || '/placeholder.png'}
                alt={project.name}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Project ID</label>
                    <p className="mt-1">{projectId}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Project Name</label>
                    <p className="mt-1">{project.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Project Status</label>
                    <p className="mt-1">
                      <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUSES_CLASS_MAP[project.status]}`}>
                        {PROJECT_STATUSES_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">{project.createdBy?.name || 'Unknown'}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1">{project.due_date || 'N/A'}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Create Date</label>
                    <p className="mt-1">{project.created_at || 'N/A'}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1">{project.updatedBy?.name || 'Unknown'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">Project Description</label>
                <p className="mt-1">{project.description || 'No description'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <TasksTable tasks={tasks} queryParams={queryParams} hideProjectName={true} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
