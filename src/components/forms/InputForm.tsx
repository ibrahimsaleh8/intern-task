import { Input } from "@/components/ui/input";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  label: string;
  id: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  isError?: FieldError;
  type: string;
};

export default function FormInput({
  label,
  id,
  placeholder,
  register,
  isError,
  type,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <Input
        {...register}
        type={type}
        placeholder={placeholder}
        id={id}
        className={isError ? "border-red-500" : ""}
      />
    </div>
  );
}
