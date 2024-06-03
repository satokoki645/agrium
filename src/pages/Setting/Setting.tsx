import React from "react";
import { useForm } from "react-hook-form";

type SettingsFormData = {
  username: string;
  email: string;
  notifications: boolean;
};

export const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>();

  const onSubmit = (data: SettingsFormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Settings
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              {...register("username", { required: "Username is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
            {errors.username && (
              <span className="text-xs text-red-600 mt-1">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Eメール
            </label>
            <input
              id="email"
              {...register("email", { required: "Email is required" })}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
            {errors.email && (
              <span className="text-xs text-red-600 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <label
              htmlFor="notifications"
              className="block text-sm font-medium text-gray-700 mr-3"
            >
              通知を受け取る
            </label>
            <input
              id="notifications"
              {...register("notifications")}
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-white bg-green-200 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
              登録する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
