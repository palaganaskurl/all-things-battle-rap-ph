import { LetterPlay } from "@/app/types/letter-play";
import sql from "@/modules/database/postgres";

abstract class VideosDatabase {
  abstract search(query: string): Promise<LetterPlay[]>;
}

export class VideosDatabasePostgreSQL extends VideosDatabase {
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
}

export class LetterPlays {
  #database: VideosDatabase;

  constructor(database: VideosDatabase) {
    this.#database = database;
  }

  async searchLetterPlays(query: string): Promise<LetterPlay[]> {
    return await this.#database.search(query);
  }
}
