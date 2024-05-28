import React from "react";
import { useForm } from "react-hook-form";

export const ButtonComponent = ({ size, name, id, label }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return <button type="submit">{label}</button>;
};
