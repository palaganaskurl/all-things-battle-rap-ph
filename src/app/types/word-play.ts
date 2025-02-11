export type WordPlay = {
  wordPlay: string;
  explanationOrContext: string;
  videoName: string;
  videoURL: string;
  timestamp: string;
  rapper: string;
  date: string;
  dateTimestamp: number;
  videoURLWithTimestamp: string;
  videoID: string;
};

export type BattlePreview = Pick<WordPlay, "videoID" | "videoName">;
