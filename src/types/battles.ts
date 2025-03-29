export type BattleLeagues = "fliptop" | "motus" | "sunugan";

export type AnalyzedBattle = {
  done_count: number;
  all_count: number;
};

export type BattleDataByLeague = {
  [key in BattleLeagues]: AnalyzedBattle;
};

export type BattlePreview = {
  videoID: string;
  videoName: string;
  redirectPrefix: string;
};

export type BattleLeagueFilters = {
  filters: {
    battleLeagues?: string[];
    emcees?: string[];
  };
  pagination?: {
    page: number;
    perPage: number;
  };
};
