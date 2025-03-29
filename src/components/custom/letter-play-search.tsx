"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LetterPlaySearch({ query }: { query: string }) {
  const [searchQuery, setSearchQuery] = useState(query);
  const router = useRouter();
  const handleSubmit = () => {
    router.push(`/letter-plays/${searchQuery.trim()}`);
  };

  return (
    <div className="py-2">
      <Input
        value={searchQuery}
        type="search"
        placeholder="Search Letter Plays"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
    </div>
  );
}
