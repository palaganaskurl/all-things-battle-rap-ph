import WordPlaysByBattleTable from "@/components/custom/word-plays-by-battle-table";

export default function WordPlaysByBattleLoading() {
  return (
    <div>
      <WordPlaysByBattleTable isLoading={true} />
    </div>
  );
}
