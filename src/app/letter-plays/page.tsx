import BattleCard from "@/components/custom/battle-card";
import LetterPlaySearch from "@/components/custom/letter-play-search";
import {
  LetterPlays,
  LetterPlaysDatabasePostgreSQL,
} from "@/modules/letter-plays/letter-plays";

export default async function LetterPlaysPageRoot() {
  const letterPlaysController = new LetterPlays(
    new LetterPlaysDatabasePostgreSQL()
  );
  const letterPlays = await letterPlaysController.getUniqueVideos();

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
    <div>
      <div>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Collection of anagram, palindromes, and other letter plays in battle
          rap.
        </p>
      </div>
      <LetterPlaySearch query="" />
      <div className="mt-4 flex flex-col">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {renderBattleCards()}
        </div>
      </div>
    </div>
  );
}
