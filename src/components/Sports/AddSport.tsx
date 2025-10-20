"use client";
import ErrorMessage from "@/components/forms/ErrorMessage";
import FormInput from "@/components/forms/InputForm";
import TextAreaForm from "@/components/forms/TextAreaForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAddSport } from "@/hooks/useAddSport";

export default function AddSport() {
  const { submitNewSport, errors, register, handleSubmit, isPending } =
    useAddSport();
  return (
    <form
      onSubmit={handleSubmit(submitNewSport)}
      className="flex flex-col gap-5 ">
      <p className="text-2xl font-medium">Add New Sport</p>

      <FormInput
        id="title"
        label="Sport Title"
        placeholder="Sport Title"
        register={register("title")}
        type="text"
        isError={errors.title}
      />
      {errors.title && (
        <ErrorMessage message={errors.title.message || "error in this field"} />
      )}
      <TextAreaForm
        id="desc"
        label="Sport Description"
        placeholder="Sport Description"
        register={register("description")}
        isError={errors.description}
      />
      {errors.description && (
        <ErrorMessage
          message={errors.description.message || "error in this field"}
        />
      )}
      <Button disabled={isPending}>{isPending ? <Spinner /> : "Add"}</Button>
    </form>
  );
}
