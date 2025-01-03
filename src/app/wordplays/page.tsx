import WordPlaySearch from "@/components/custom/word-play-search";
import { promises as fs } from "fs";
import { AnalyzedBattle } from "@/app/types/battles";

export default async function WordPlaysPageRoot() {
  const flipTopFile = await fs.readFile(
    process.cwd() + "/src/app/data/word-play/fliptop.json",
    "utf8"
  );
  const flipTopData: AnalyzedBattle = JSON.parse(flipTopFile);

  return (
    <div>
      <WordPlaySearch />

      {/* TODO: Convert this to a footer component */}
      <div className="text-center mt-8">
        Analyzed {flipTopData.done_count} / {flipTopData.all_count} FlipTop
        Videos
      </div>
    </div>
  );
}
