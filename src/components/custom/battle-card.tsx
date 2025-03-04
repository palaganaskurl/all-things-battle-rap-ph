"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { BattlePreview } from "@/app/types/battles";

export default function BattleCard({
  videoName,
  videoID,
  redirectPrefix,
}: BattlePreview) {
  const router = useRouter();
  const openBattleWordPlays = useCallback(() => {
    router.push(`${redirectPrefix}/${videoID}`);
  }, [videoID, router, redirectPrefix]);

  return (
    <Card
      className="flex flex-col overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl hover:cursor-pointer"
      onClick={openBattleWordPlays}
    >
      <CardHeader className="grow">
        <CardTitle>{videoName}</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`}
            alt="Image"
            className="rounded-md object-cover"
            fill
            style={{
              objectFit: "contain",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
}
