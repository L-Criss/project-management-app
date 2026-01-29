import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Edit({auth, user}) {
  const {data, setData, post, errors} = useForm({
    name: user.name || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("users.update", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Edit User "{user.name}"
          </h2>
        </div>
      }
    >
      <Head title="Edit User" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
            >
              {/* User Name */}
              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="User Name" />
                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  isFocused
                  className="mt-1 block w-full"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* User Email */}
              <div className="mt-4">
                <InputLabel htmlFor="user_email" value="User Email" />
                <TextInput
                  id="user_email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              {/* Password */}
              <div className="mt-4">
                <InputLabel htmlFor="user_password" value="User Password" />
                <TextInput
                  id="user_password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              {/* Password Confirmation */}
              <div className="mt-4">
                <InputLabel htmlFor="user_password_confirmation" value="Password Confirmation" />
                <TextInput
                  id="user_password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
              </div>

              {/* Actions */}
              <div className="mt-4 text-right">
                <Link
                  href={route('users.index')}
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
