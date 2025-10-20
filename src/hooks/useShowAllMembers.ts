import { mainDomain } from "@/lib/MainDomain";
import { MemberDataType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
async function getAllMembers(): Promise<MemberDataType[]> {
  const res = await axios.get(`${mainDomain}/api/members`);
  return res.data;
}
export const useShowAllMembers = () => {
  const {
    data: members,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all_members"],
    queryFn: getAllMembers,
  });
  return { members, isLoading, isError, error };
};
