import { BattlePreview } from "@/app/types/battles";
import { LetterPlay } from "@/app/types/letter-play";
import sql from "@/modules/database/postgres";

abstract class LetterPlaysDatabase {
  abstract search(query: string): Promise<LetterPlay[]>;
  abstract getUniqueVideos(): Promise<BattlePreview[]>;
  abstract getWordPlaysByVideoID(videoID: string): Promise<LetterPlay[]>;
}

export class LetterPlaysDatabasePostgreSQL extends LetterPlaysDatabase {
  constructor() {
    super();
  }

  async search(query: string): Promise<LetterPlay[]> {
    const ilike = `%${query}%`;
    const letterPlays = (await sql`
        SELECT * 
        FROM "all-things-battle-rap-ph".tbl_letter_plays AS lp
        WHERE lp."letterPlay" ILIKE ${ilike}
        ORDER BY lp."dateTimestamp" ASC
    `) as LetterPlay[];

    return letterPlays;
  }

  async getUniqueVideos(): Promise<BattlePreview[]> {
    const videos = (await sql`
        SELECT DISTINCT lp."videoID", lp."videoName"
        FROM "all-things-battle-rap-ph".tbl_letter_plays AS lp
    `) as BattlePreview[];

    return videos;
  }

  async getWordPlaysByVideoID(videoID: string): Promise<LetterPlay[]> {
    const wordPlays = (await sql`
        SELECT * 
        FROM "all-things-battle-rap-ph".tbl_letter_plays AS lp
        WHERE lp."videoID" = ${videoID}
        ORDER BY lp."timestampInSeconds" ASC
    `) as LetterPlay[];

    return wordPlays;
  }
}

export class LetterPlays {
  #database: LetterPlaysDatabase;

  constructor(database: LetterPlaysDatabase) {
    this.#database = database;
  }

  async searchLetterPlays(query: string): Promise<LetterPlay[]> {
    return await this.#database.search(query);
  }

  async getUniqueVideos(): Promise<BattlePreview[]> {
    return await this.#database.getUniqueVideos();
  }

  async getWordPlaysByVideoID(videoID: string): Promise<LetterPlay[]> {
    return await this.#database.getWordPlaysByVideoID(videoID);
  }
}
