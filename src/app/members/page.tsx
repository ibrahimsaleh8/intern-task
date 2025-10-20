import AddMember from "@/components/Members/AddMember";
import ShowAllMembers from "@/components/Members/ShowAllMembers";

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-4 pt-10 md:w-3/4 mx-auto">
      <AddMember />
      <ShowAllMembers />
    </div>
  );
}
