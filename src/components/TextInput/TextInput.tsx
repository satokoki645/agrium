import React from "react";
import { useForm } from "react-hook-form";

export const TextInput = ({ label, name, register, required, errors }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} {...register(name, { required })} />
      {errors[name] && <span>This field is required</span>}
    </div>
  );
};
