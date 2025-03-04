import LetterPlaySearch from "@/components/custom/letter-play-search";
import { SkeletonCard } from "@/components/custom/skeleton-card";

export default function LetterPlayQueryLoading() {
  return (
    <div>
      <div>
        <p className="leading-7 not-first:mt-6">
          Collection of anagram, palindromes, and other letter plays in battle
          rap.
        </p>
      </div>
      <LetterPlaySearch query="" />
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
