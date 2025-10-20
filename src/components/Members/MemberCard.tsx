import { CircleUserRound, Mail } from "lucide-react";

type Props = {
  email: string;
  name: string;
};
export default function MemberCard({ email, name }: Props) {
  return (
    <div className="p-4 bg-white rounded-md text-black w-96 max-w-full font-medium flex flex-col gap-3">
      <p className="flex items-center gap-1">
        <Mail className="w-5 h-5" />
        {email}
      </p>
      <p className="flex items-center gap-1">
        <CircleUserRound className="w-5 h-5" />
        {name}
      </p>
    </div>
  );
}
