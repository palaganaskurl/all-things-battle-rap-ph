import { WordPlay, BattlePreview } from "@/app/types/word-play";
import sql from "@/modules/database/postgres";

abstract class WordPlaysDatabase {
  abstract search(query: string): Promise<WordPlay[]>;
  abstract getUniqueVideos(): Promise<BattlePreview[]>;
  abstract getWordPlaysByVideoID(videoID: string): Promise<WordPlay[]>;
}

export class WordPlaysDatabasePostgreSQL extends WordPlaysDatabase {
  constructor() {
    super();
  }

  async search(query: string): Promise<WordPlay[]> {
    const ilike = `%${query}%`;
    const wordPlays = (await sql`
        SELECT * 
        FROM "all-things-battle-rap-ph".tbl_word_plays AS wp
        WHERE wp."wordPlay" ILIKE ${ilike}
        ORDER BY wp."dateTimestamp" ASC
    `) as WordPlay[];

    return wordPlays;
  }

  async getUniqueVideos(): Promise<BattlePreview[]> {
    const videos = (await sql`
        SELECT DISTINCT wp."videoID", wp."videoName"
        FROM "all-things-battle-rap-ph".tbl_word_plays AS wp
    `) as BattlePreview[];

    return videos;
  }

  async getWordPlaysByVideoID(videoID: string): Promise<WordPlay[]> {
    const wordPlays = (await sql`
        SELECT * 
        FROM "all-things-battle-rap-ph".tbl_word_plays AS wp
        WHERE wp."videoID" = ${videoID}
        ORDER BY wp."timestamp" DESC
    `) as WordPlay[];

    return wordPlays;
  }
}

export class WordPlays {
  #database: WordPlaysDatabase;

  constructor(database: WordPlaysDatabase) {
    this.#database = database;
  }

  async searchWordPlays(query: string): Promise<WordPlay[]> {
    return await this.#database.search(query);
  }

  async getUniqueVideos(): Promise<BattlePreview[]> {
    return await this.#database.getUniqueVideos();
  }

  async getWordPlaysByVideoID(videoID: string): Promise<WordPlay[]> {
    return await this.#database.getWordPlaysByVideoID(videoID);
  }
}
