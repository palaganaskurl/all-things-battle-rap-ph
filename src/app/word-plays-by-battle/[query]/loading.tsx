import { Spinner } from "@/components/ui/spinner";

export default function WordPlaysByBattleLoading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-101px)]">
      <Spinner size="large" />
    </div>
  );
}
