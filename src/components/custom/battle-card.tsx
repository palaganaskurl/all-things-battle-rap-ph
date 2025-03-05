"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BattlePreview } from "@/types/battles";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BattleCard({
  videoName,
  videoID,
  redirectPrefix,
}: BattlePreview) {
  const [cannotGetThumbnail, setCannotGetThumbnail] = useState(false);
  const imageSrc = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  const fallbackSrc = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;

  useEffect(() => {
    setCannotGetThumbnail(false);
  }, [imageSrc]);

  return (
    <Link
      href={`${redirectPrefix}/${videoID}`}
      className="flex flex-col h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl hover:cursor-pointer">
        <CardHeader className="h-[50px] flex items-center justify-center pt-8">
          <CardTitle className="w-full text-center">{videoName}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center px-4 pt-1 pb-4">
          <AspectRatio ratio={16 / 9} className="w-full">
            <Image
              src={cannotGetThumbnail ? fallbackSrc : imageSrc}
              alt="Image"
              className="rounded-md object-contain" // Changed from object-cover to object-contain
              fill
              style={{
                objectFit: "contain",
                objectPosition: "center", // Ensure center positioning
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => {
                setCannotGetThumbnail(true);
              }}
            />
          </AspectRatio>
        </CardContent>
      </Card>
    </Link>
  );
}
