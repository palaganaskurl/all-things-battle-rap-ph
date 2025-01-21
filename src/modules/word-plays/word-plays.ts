import { WordPlay } from "@/app/types/word-play";
import sql from "@/modules/database/postgres";

abstract class WordPlaysDatabase {
  abstract search(query: string): Promise<WordPlay[]>;
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
        ORDER BY wp."date" DESC
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
}
