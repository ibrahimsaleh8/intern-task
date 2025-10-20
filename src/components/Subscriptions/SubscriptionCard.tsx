import { Mail } from "lucide-react";

type Props = {
  sports: string[];
  email: string;
};
export default function SubscriptionCard({ email, sports }: Props) {
  return (
    <div className="p-4 bg-white rounded-md text-black w-96 max-w-full font-medium flex flex-col gap-3">
      <p className="flex items-center gap-1">
        <Mail className="w-5 h-5" />
        {email}
      </p>

      <div>
        <p>Sports:</p>
        {sports.map((sport, i) => (
          <p key={i}>{sport}</p>
        ))}
      </div>
    </div>
  );
}
