import { mainDomain } from "@/lib/MainDomain";
import { SportDataType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
async function getAllSports(): Promise<SportDataType[]> {
  const res = await axios.get(`${mainDomain}/api/sports`);
  return res.data;
}

export const useShowAllSports = () => {
  const {
    data: sports,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all_sports"],
    queryFn: getAllSports,
  });
  return { sports, isLoading, isError, error };
};
