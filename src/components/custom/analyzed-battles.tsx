import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BattleLeagueStats {
  name: string;
  done_count: number;
  all_count: number;
}

interface StatisticsSectionProps {
  battleLeagues: BattleLeagueStats[];
}

export function AnalyzedBattles({ battleLeagues }: StatisticsSectionProps) {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
      {battleLeagues.map((league) => (
        <Card key={league.name} className="flex flex-col">
          <CardHeader className="flex-grow">
            <CardTitle className="text-lg font-semibold text-center">
              {league.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-end">
            <p className="text-3xl font-bold text-center">
              {league.done_count} / {league.all_count}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Battles Analyzed
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
