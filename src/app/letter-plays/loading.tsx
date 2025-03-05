import { Spinner } from "@/components/ui/spinner";

export default async function LetterPlayQueryLoading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-101px)]">
      <Spinner size="large" />
    </div>
  );
}
