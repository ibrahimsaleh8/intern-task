import axios from "axios";
import { mainDomain } from "@/lib/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GlobalToast } from "@/lib/GlobalToast";
import { ErrorAxiosResponse } from "@/lib/types";
import { useShowAllMembers } from "@/hooks/useShowAllMembers";
import { useShowAllSports } from "@/hooks/useShowAllSports";
import { useShowAllSubscriptions } from "@/hooks/useShowAllSubscriptions";
import {
  AddSubscriptionrDataType,
  addSubscriptionSchema,
} from "@/validation/addSubscriptionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

async function createNewSubscribe(data: AddSubscriptionrDataType) {
  await axios.post(`${mainDomain}/api/subscriptions`, data);
}

export const useAddSubscribtion = () => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddSubscriptionrDataType>({
    resolver: zodResolver(addSubscriptionSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AddSubscriptionrDataType) => createNewSubscribe(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["all_members"] });
      queryClient.refetchQueries({ queryKey: ["all_sports"] });
      queryClient.refetchQueries({ queryKey: ["all_subscriptions"] });
      GlobalToast("success", "Subscription Added Success");
    },
    onError: (err: ErrorAxiosResponse) => {
      console.log(err);
      GlobalToast("error", err.response.data.message ?? "Something went wrong");
    },
  });

  const submitNewSubscribe: SubmitHandler<AddSubscriptionrDataType> = (
    data
  ) => {
    mutate(data);
  };

  //   Apis
  const {
    error: ErroMember,
    isLoading: LoadingMembers,
    members,
  } = useShowAllMembers();

  const {
    error: ErrorSports,
    isLoading: LoadingSports,
    sports,
  } = useShowAllSports();

  const { error, isError, subscriptions } = useShowAllSubscriptions();

  return {
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
  };
};
