"use client";

import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LetterPlaySearch({ query }: { query: string }) {
  const [searchQuery, setSearchQuery] = useState(query);
  const handleSubmit = () => {
    redirect(`/letter-plays/${searchQuery.trim()}`);
  };

  return (
    <div className="py-2">
      <Input
        value={searchQuery}
        type="search"
        placeholder="Search Anagrams / Palindromes"
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
