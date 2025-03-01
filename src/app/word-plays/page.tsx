import BattleCard from "@/components/custom/battle-card";
import WordPlaySearch from "@/components/custom/word-play-search";
import {
  WordPlays,
  WordPlaysDatabasePostgreSQL,
} from "@/modules/word-plays/word-plays";

export default async function WordPlaysPageRoot() {
  const wordPlaysController = new WordPlays(new WordPlaysDatabasePostgreSQL());
  const wordPlays = await wordPlaysController.getUniqueVideos();

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
    <div>
      <div>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Collection of double entendres, syllable plays, homophones, webbings,
          puns, name plays, and other word plays in battle rap.
        </p>
      </div>
      <WordPlaySearch query="" />
      <div className="mt-4 flex flex-col">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {renderBattleCards()}
        </div>
      </div>
    </div>
  );
}
