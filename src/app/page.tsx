import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnalyzedBattles } from "@/components/custom/analyzed-battles";
import { BattleDataByLeague } from "@/app/types/battles";
import { promises as fs } from "fs";

export default async function Home() {
  const latestReleases = [
    {
      title: "FlipTop - Tipsy D vs. Frooz",
      thumbnail: "https://img.youtube.com/vi/-pDXe4AsDZ4/maxresdefault.jpg",
    },
    {
      title: "Motus Battle League - Poison 13 vs Saint Ice",
      thumbnail: "https://img.youtube.com/vi/huSFmwPfu4Y/maxresdefault.jpg",
    },
  ];
  const allBattleFiles = await fs.readFile(
    process.cwd() + "/src/app/data/all_battles.json",
    "utf8"
  );
  const battleDataByLeague: BattleDataByLeague = JSON.parse(allBattleFiles);
  const battleLeagues = [
    { name: "FlipTop Battle League", ...battleDataByLeague["fliptop"] },
    { name: "Motus Battle League", ...battleDataByLeague["motus"] },
    { name: "Sunugan Rap Battle League", done_count: 0, all_count: 0 },
    { name: "Pulo Battle League", done_count: 0, all_count: 0 },
  ];

  return (
    <div className="container mx-auto gap-4">
      <section className="flex flex-col gap-4">
        <div className="flex justify-center mt-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-2xl">
            Latest Releases
          </h1>
        </div>
        <div className="flex justify-center">
          <Carousel
            opts={{
              align: "center",
            }}
            className="w-full max-w-[70%]"
          >
            <CarouselContent>
              {latestReleases.map((release, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <div className="p-1">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <Image
                        src={release.thumbnail}
                        alt="Photo by Drew Beamer"
                        fill
                        className="h-full w-full rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <section className="flex flex-col gap-4 px-4 md:px-0">
        <div className="flex justify-center mt-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-2xl text-center">
            Analyzed Battle Leagues
          </h1>
        </div>
        <AnalyzedBattles battleLeagues={battleLeagues} />
      </section>
      <section className="gap-4">
        <br />
      </section>
    </div>
  );
}
