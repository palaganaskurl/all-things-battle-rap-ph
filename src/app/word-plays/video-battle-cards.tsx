import BattleCard from "@/components/custom/battle-card";
import {
  WordPlays,
  WordPlaysDatabasePostgreSQL,
} from "@/modules/word-plays/word-plays";

export default async function WordPlayVideoBattleCards({
  battleLeaguesFilter,
  emceesFilter,
}: {
  battleLeaguesFilter: string | undefined;
  emceesFilter: string | undefined;
}) {
  const wordPlaysController = new WordPlays(new WordPlaysDatabasePostgreSQL());
  const wordPlays = await wordPlaysController.getUniqueVideos({
    filters: {
      battleLeagues: battleLeaguesFilter ? battleLeaguesFilter.split(",") : [],
      emcees: emceesFilter ? emceesFilter.split(",") : [],
    },
  });

  const renderBattleCards = () => {
    return wordPlays.map((battle, index) => (
      <BattleCard
        key={`battle-${index}`}
        videoName={battle.videoName}
        videoID={battle.videoID}
        redirectPrefix="/word-plays-by-battle"
      />
    ));
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      {renderBattleCards()}
    </div>
  );
}
