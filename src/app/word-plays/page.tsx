import BattleCard from "@/components/custom/battle-card";
import WordPlaySearch from "@/components/custom/word-play-search";
import {
  WordPlays,
  WordPlaysDatabasePostgreSQL,
} from "@/modules/word-plays/word-plays";
import { BattlePreview } from "../types/word-play";

export default async function WordPlaysPageRoot() {
  const wordPlaysController = new WordPlays(new WordPlaysDatabasePostgreSQL());
  const wordPlays = await wordPlaysController.getUniqueVideos();

  const renderBattleCards = () => {
    return wordPlays.map((battle, index) => (
      <BattleCard
        key={`battle-${index}`}
        videoName={battle.videoName}
        videoID={battle.videoID}
      />
    ));
  };

  return (
    <div>
      <WordPlaySearch query="" />
      <div className="mt-4 flex flex-col">
        <div className="grid grid-cols-3 gap-4">{renderBattleCards()}</div>
      </div>
    </div>
  );
}
