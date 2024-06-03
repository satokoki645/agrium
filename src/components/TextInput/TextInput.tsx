import React from "react";
import { useForm, FieldErrors, UseFormRegister } from "react-hook-form";

type TextInputPropsType = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required: boolean;
  errors: FieldErrors<any>;
};

export const TextInput = ({
  label,
  name,
  register,
  required,
  errors,
}: TextInputPropsType) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        {...register(name, { required })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
      />
      {errors[name] && (
        <span className="text-xs text-red-600 mt-1">
          This field is required
        </span>
      )}
    </div>
  );
};
