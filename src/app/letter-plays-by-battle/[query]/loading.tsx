import LetterPlaysByBattleTable from "@/components/custom/letter-plays-by-battle";

export default function LetterPlaysByBattleLoading() {
  return (
    <div>
      <LetterPlaysByBattleTable isLoading={true} />
    </div>
  );
}
