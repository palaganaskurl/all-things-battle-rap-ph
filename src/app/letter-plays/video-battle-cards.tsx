import BattleCard from "@/components/custom/battle-card";
import { BattlesPerPage } from "@/constants";
import {
  LetterPlays,
  LetterPlaysDatabasePostgreSQL,
} from "@/modules/letter-plays/letter-plays";

export default async function LetterPlayVideoBattleCards({
  battleLeaguesFilter,
  emceesFilter,
  currentPage = 1,
  perPage = BattlesPerPage,
}: {
  battleLeaguesFilter: string | undefined;
  emceesFilter: string | undefined;
  currentPage?: number;
  perPage?: number;
}) {
  const letterPlaysController = new LetterPlays(
    new LetterPlaysDatabasePostgreSQL()
  );
  const letterPlays = await letterPlaysController.getUniqueVideos({
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
    return letterPlays.map((battle, index) => (
      <BattleCard
        key={`battle-${index}`}
        videoName={battle.videoName}
        videoID={battle.videoID}
        redirectPrefix="/letter-plays-by-battle"
      />
    ));
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      {renderBattleCards()}
    </div>
  );
}
