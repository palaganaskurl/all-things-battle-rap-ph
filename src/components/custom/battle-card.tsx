"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { BattlePreview } from "@/app/types/battles";
import { useState, useEffect } from "react";

export default function BattleCard({
  videoName,
  videoID,
  redirectPrefix,
}: BattlePreview) {
  const router = useRouter();
  const openBattleWordPlays = useCallback(() => {
    router.push(`${redirectPrefix}/${videoID}`);
  }, [videoID, router, redirectPrefix]);
  const [cannotGetThumbnail, setCannotGetThumbnail] = useState(false);
  const imageSrc = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  const fallbackSrc = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;

  useEffect(() => {
    setCannotGetThumbnail(false);
  }, [imageSrc]);

  return (
    <Card
      className="flex flex-col overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl hover:cursor-pointer"
      onClick={openBattleWordPlays}
    >
      <CardHeader className="grow">
        <CardTitle>{videoName}</CardTitle>
      </CardHeader>
      <CardContent className="grow flex items-end">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={cannotGetThumbnail ? fallbackSrc : imageSrc}
            alt="Image"
            className="rounded-md object-cover"
            fill
            style={{
              objectFit: "contain",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => {
              setCannotGetThumbnail(true);
            }}
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
}
