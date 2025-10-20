"use client";
import { useShowAllMembers } from "@/hooks/useShowAllMembers";
import { Spinner } from "../ui/spinner";
import MemberCard from "./MemberCard";

export default function ShowAllMembers() {
  const { error, isError, isLoading, members } = useShowAllMembers();

  if (error && isError) {
    return (
      <div className="text-2xl text-red-500 capitalize">{error.message}</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-10">
      <p className="font-medium">All Members</p>
      <div className="flex gap-4 flex-wrap">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Spinner />
            Loading Members
          </div>
        ) : members && members.length > 0 ? (
          members.map((member) => (
            <MemberCard
              email={member.email}
              name={member.name}
              key={member.id}
            />
          ))
        ) : (
          <>No Members Founded</>
        )}
      </div>
    </div>
  );
}
