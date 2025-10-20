import { GlobalToast } from "@/lib/GlobalToast";
import { mainDomain } from "@/lib/MainDomain";
import { ErrorAxiosResponse } from "@/lib/types";
import { AddSportDataType, addSportSchema } from "@/validation/addSportSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

async function createNewSportApi(sportData: AddSportDataType) {
  await axios.post(`${mainDomain}/api/sports`, sportData);
}

export const useAddSport = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddSportDataType>({
    resolver: zodResolver(addSportSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (sportData: AddSportDataType) => createNewSportApi(sportData),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["all_sports"] });
      GlobalToast("success", "Sport Added Success");
      reset({ title: "", description: "" });
    },
    onError: (err: ErrorAxiosResponse) => {
      console.log(err);
      GlobalToast("error", err.response.data.message ?? "Something went wrong");
    },
  });

  const submitNewSport: SubmitHandler<AddSportDataType> = (data) => {
    mutate(data);
  };
  return { submitNewSport, errors, register, handleSubmit, isPending };
};
