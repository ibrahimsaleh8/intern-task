import AddNewSubscribe from "@/components/Subscriptions/AddNewSubscribe";
import ShowAllSubscriptions from "@/components/Subscriptions/ShowAllSubscriptions";

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col gap-4 pt-10 md:w-3/4 mx-auto">
      <AddNewSubscribe />
      <ShowAllSubscriptions />
    </div>
  );
}
