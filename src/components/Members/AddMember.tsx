"use client";
import ErrorMessage from "@/components/forms/ErrorMessage";
import FormInput from "@/components/forms/InputForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAddMember } from "@/hooks/useAddMember";

export default function AddMember() {
  const { submitNewSport, errors, register, handleSubmit, isPending } =
    useAddMember();
  return (
    <form
      onSubmit={handleSubmit(submitNewSport)}
      className="flex flex-col gap-5 ">
      <p className="text-2xl font-medium">Add New Member</p>

      <FormInput
        id="email"
        label="Email"
        placeholder="Email"
        register={register("email")}
        type="email"
        isError={errors.email}
      />
      {errors.email && (
        <ErrorMessage message={errors.email.message || "error in this field"} />
      )}
      <FormInput
        id="name"
        label="Name"
        placeholder="Name"
        register={register("name")}
        type="text"
        isError={errors.name}
      />
      {errors.name && (
        <ErrorMessage message={errors.name.message || "error in this field"} />
      )}
      <Button disabled={isPending}>{isPending ? <Spinner /> : "Add"}</Button>
    </form>
  );
}
