export default function ErrorMessage({ message }: { message: string }) {
  return <p className="text-red-500">* {message}</p>;
}
