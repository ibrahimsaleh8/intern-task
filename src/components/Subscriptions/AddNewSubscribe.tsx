"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "../ui/spinner";
import ErrorMessage from "../forms/ErrorMessage";
import { Button } from "../ui/button";
import { useAddSubscribtion } from "@/hooks/useAddSubscribtion";

export default function AddNewSubscribe() {
  const {
    error,
    isError,
    subscriptions,
    ErrorSports,
    isLoading: LoadingSports,
    sports,
    ErroMember,
    LoadingMembers,
    members,
    submitNewSubscribe,
    isPending,
    handleSubmit,
    errors,
    setValue,
    watch,
  } = useAddSubscribtion();

  if (ErroMember) {
    return (
      <div className="text-2xl text-red-500 capitalize">
        {ErroMember.message}
      </div>
    );
  }
  if (ErrorSports) {
    return (
      <div className="text-2xl text-red-500 capitalize">
        {ErrorSports.message}
      </div>
    );
  }
  if (error && isError) {
    return (
      <div className="text-2xl text-red-500 capitalize">{error.message}</div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submitNewSubscribe)}
      className="flex flex-col gap-4">
      {LoadingMembers ? (
        <div className="flex items-center gap-3">
          <Spinner />
          Loading Subscriptions
        </div>
      ) : (
        members && (
          <div className="flex flex-col gap-1">
            <label htmlFor="member">Member:</label>
            <Select
              onValueChange={(e) => {
                setValue("email", e);
              }}>
              <SelectTrigger id="member" className="w-full">
                <SelectValue placeholder="Members" />
              </SelectTrigger>
              <SelectContent>
                {members.length > 0 ? (
                  members.map((member) => (
                    <SelectItem key={member.id} value={member.email}>
                      {member.email}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="">
                    No members found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        )
      )}
      {errors.email && (
        <ErrorMessage message={errors.email.message || "error in this field"} />
      )}

      {LoadingSports ? (
        <div className="flex items-center gap-3">
          <Spinner />
          Loading Sports
        </div>
      ) : (
        sports &&
        subscriptions && (
          <div className="flex flex-col gap-1">
            <label htmlFor="sports">Sports:</label>
            <Select
              onValueChange={(e) => {
                setValue("sport", e);
              }}>
              <SelectTrigger id="sports" className="w-full">
                <SelectValue placeholder="Sports" />
              </SelectTrigger>
              <SelectContent>
                {sports.length > 0 ? (
                  sports.map((sport) => (
                    <SelectItem
                      disabled={
                        watch("email") != "" &&
                        subscriptions.findIndex(
                          (s) =>
                            s.email == watch("email") &&
                            s.sport.includes(sport.title)
                        ) != -1
                      }
                      key={sport.id}
                      value={sport.title}>
                      {sport.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="">
                    No sports found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        )
      )}
      {errors.sport && (
        <ErrorMessage message={errors.sport.message || "error in this field"} />
      )}

      <Button disabled={isPending}>{isPending ? <Spinner /> : "Add"}</Button>
    </form>
  );
}
