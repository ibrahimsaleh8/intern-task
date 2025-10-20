import { GlobalToast } from "@/lib/GlobalToast";
import { mainDomain } from "@/lib/MainDomain";
import { ErrorAxiosResponse } from "@/lib/types";
import {
  AddMemberDataType,
  addMemberSchema,
} from "@/validation/addMemberSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

async function createNewMemberApi(memberData: AddMemberDataType) {
  await axios.post(`${mainDomain}/api/members`, memberData);
}

export const useAddMember = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddMemberDataType>({
    resolver: zodResolver(addMemberSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (memberData: AddMemberDataType) =>
      createNewMemberApi(memberData),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["all_members"] });
      GlobalToast("success", "Member Added Success");
      reset({ email: "", name: "" });
    },
    onError: (err: ErrorAxiosResponse) => {
      console.log(err);
      GlobalToast("error", err.response.data.message ?? "Something went wrong");
    },
  });

  const submitNewSport: SubmitHandler<AddMemberDataType> = (data) => {
    mutate(data);
  };
  return { submitNewSport, errors, register, handleSubmit, isPending };
};
