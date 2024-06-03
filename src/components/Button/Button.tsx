import React from "react";
import { useForm } from "react-hook-form";

type ButtonComponentPropsType = {
  size: string;
  name: string;
  id: string;
  children: React.ReactNode;
  onClick: () => void;
};

export const ButtonComponent = ({
  size,
  name,
  id,
  children,
  onClick,
}: ButtonComponentPropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <button
      type="submit"
      id={id}
      name={name}
      onClick={onClick}
      className={`text-white bg-green-200 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-${size} px-5 py-2.5 text-center`}
    >
      {children}
    </button>
  );
};
