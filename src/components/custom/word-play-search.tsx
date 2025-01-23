"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WordPlaySearch({ query }: { query: string }) {
  const [searchQuery, setSearchQuery] = useState(query);
  const router = useRouter();
  const handleSubmit = () => {
    router.push(`/word-plays/${searchQuery.trim()}`);
  };

  return (
    <div className="py-2">
      <Input
        value={searchQuery}
        type="search"
        placeholder="Search Wordplays"
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
