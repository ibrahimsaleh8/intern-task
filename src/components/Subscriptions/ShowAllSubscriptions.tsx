"use client";
import { useShowAllSubscriptions } from "@/hooks/useShowAllSubscriptions";
import { Spinner } from "../ui/spinner";
import SubscriptionCard from "./SubscriptionCard";

export default function ShowAllSubscriptions() {
  const { error, isError, isLoading, subscriptions } =
    useShowAllSubscriptions();

  if (error && isError) {
    return (
      <div className="text-2xl text-red-500 capitalize">{error.message}</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-10">
      <p className="font-medium">All Subscriptions</p>
      <div className="flex gap-4 flex-wrap">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Spinner />
            Loading Subscriptions
          </div>
        ) : subscriptions && subscriptions.length > 0 ? (
          subscriptions.map((subsc) => (
            <SubscriptionCard
              email={subsc.email}
              key={subsc.id}
              sports={subsc.sport}
            />
          ))
        ) : (
          <>No Subscriptions Founded</>
        )}
      </div>
    </div>
  );
}
