import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type FormInputProps = {
  label: string;
  id: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  isError?: FieldError;
};

export default function TextAreaForm({
  label,
  id,
  placeholder,
  register,
  isError,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <Textarea
        {...register}
        placeholder={placeholder}
        id={id}
        className={isError ? "border-red-500" : ""}
      />
    </div>
  );
}
