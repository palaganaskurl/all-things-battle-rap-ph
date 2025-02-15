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
import { AnalyzedBattle } from "@/app/types/battles";
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
  const flipTopFile = await fs.readFile(
    process.cwd() + "/src/app/data/word-play/fliptop.json",
    "utf8"
  );
  const flipTopData: AnalyzedBattle = JSON.parse(flipTopFile);
  const battleLeagues = [
    { name: "FlipTop Battle League", ...flipTopData },
    { name: "Motus Battle League", done_count: 0, all_count: 0 },
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
            className="w-full max-w-4xl"
          >
            <CarouselContent>
              {latestReleases.map((release, index) => (
                <CarouselItem key={index} className="">
                  <div className="p-1">
                    <div>
                      <AspectRatio ratio={16 / 9} className="bg-muted">
                        <Image
                          src={release.thumbnail}
                          alt="Photo by Drew Beamer"
                          fill
                          className="h-full w-full rounded-md object-cover"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex justify-center mt-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-2xl">
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
