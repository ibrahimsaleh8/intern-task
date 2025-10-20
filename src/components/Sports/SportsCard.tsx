import { Medal } from "lucide-react";

type Props = {
  title: string;
  descriptioin: string;
};
export default function SportsCard({ descriptioin, title }: Props) {
  return (
    <div className="p-4 bg-white rounded-md text-black w-96 max-w-full font-medium flex flex-col gap-3">
      <p className="capitalize flex items-center gap-1">
        <Medal className="w-5 h-5" />
        {title}
      </p>
      <p>{descriptioin}</p>
    </div>
  );
}
