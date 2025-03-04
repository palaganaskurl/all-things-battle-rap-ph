import { SkeletonCard } from "@/components/custom/skeleton-card";
import WordPlaySearch from "@/components/custom/word-play-search";

export default function WordPlayQueryLoading() {
  return (
    <div>
      <div>
        <p className="leading-7 not-first:mt-6">
          Collection of double entendres, syllable plays, homophones, webbings,
          puns, name plays, and other word plays in battle rap. x
        </p>
      </div>
      <WordPlaySearch query="" />
      <div className="mt-4 flex flex-col">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
