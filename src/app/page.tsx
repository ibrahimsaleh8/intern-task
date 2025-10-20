"use client";
import AddSport from "@/components/Sports/AddSport";
import ShowAllSports from "@/components/Sports/ShowAllSports";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 pt-10 md:w-3/4 mx-auto">
      <AddSport />
      <ShowAllSports />
    </div>
  );
}
