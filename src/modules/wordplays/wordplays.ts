import { WordPlay } from "@/app/types/wordplay";
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
        FROM "all-things-battle-rap-ph".tbl_wordplays AS wp
        WHERE wp."wordPlay" ILIKE ${ilike}
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
