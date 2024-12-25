"use client";

import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function WordPlaySearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = () => {
    redirect(`/wordplays/${searchQuery}`);
  };

  return (
    <div className="py-2">
      <Input
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
