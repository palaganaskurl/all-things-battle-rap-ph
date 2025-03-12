import BattleCard from "@/components/custom/battle-card";
import { BattlesPerPage } from "@/constants";
import {
  WordPlays,
  WordPlaysDatabasePostgreSQL,
} from "@/modules/word-plays/word-plays";

export default async function WordPlayVideoBattleCards({
  battleLeaguesFilter,
  emceesFilter,
  currentPage = 1,
  perPage = BattlesPerPage,
}: {
  battleLeaguesFilter?: string;
  emceesFilter?: string;
  currentPage: number;
  perPage: number;
}) {
  const wordPlaysController = new WordPlays(new WordPlaysDatabasePostgreSQL());
  const videos = await wordPlaysController.getUniqueVideos({
    filters: {
      battleLeagues: battleLeaguesFilter ? battleLeaguesFilter.split(",") : [],
      emcees: emceesFilter ? emceesFilter.split(",") : [],
    },
    pagination: {
      page: currentPage,
      perPage: perPage,
    },
  });

  const renderBattleCards = () => {
    return videos.map((battle, index) => (
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
