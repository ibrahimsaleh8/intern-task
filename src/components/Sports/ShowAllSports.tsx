"use client";

import { useShowAllSports } from "@/hooks/useShowAllSports";
import { Spinner } from "../ui/spinner";
import SportsCard from "./SportsCard";

export default function ShowAllSports() {
  const { error, isError, isLoading, sports } = useShowAllSports();

  if (error && isError) {
    return (
      <div className="text-2xl text-red-500 capitalize">{error.message}</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-10">
      <p className="font-medium">All Sports</p>
      <div className="flex gap-4 flex-wrap">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Spinner />
            Loading Sports
          </div>
        ) : sports && sports.length > 0 ? (
          sports.map((sport) => (
            <SportsCard
              key={sport.id}
              descriptioin={sport.description}
              title={sport.title}
            />
          ))
        ) : (
          <>No Sports Founded</>
        )}
      </div>
    </div>
  );
}
