"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BattlePreview } from "@/app/types/word-play";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function BattleCard({ videoName, videoID }: BattlePreview) {
  const router = useRouter();
  const openBattleWordPlays = useCallback(() => {
    router.push(`/word-plays-by-battle/${videoID}`);
  }, [videoID]);

  return (
    <Card
      className="flex flex-col overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl hover:cursor-pointer"
      onClick={openBattleWordPlays}
    >
      <CardHeader className="flex-grow">
        <CardTitle>{videoName}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`}
            alt="Image"
            className="rounded-md object-cover"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
}
