import { mainDomain } from "@/lib/MainDomain";
import { SubscriptionsDataType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getAllSubscriptions(): Promise<SubscriptionsDataType[]> {
  const res = await axios.get(`${mainDomain}/api/subscriptions`);
  return res.data;
}
export const useShowAllSubscriptions = () => {
  const {
    data: subscriptions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all_subscriptions"],
    queryFn: getAllSubscriptions,
  });
  return { subscriptions, isLoading, isError, error };
};
