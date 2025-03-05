import { tblLetterPlaysInAllThingsBattleRapPH } from "@/db/schema";
import { BattleLeagueFilters } from "@/types/battles";
import { and, asc, eq, ilike, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export class LetterPlaysDatabasePostgreSQL {
  constructor() {}

  async search(query: string) {
    const ilikeQuery = `%${query}%`;
    const db = drizzle(process.env.POSTGRES_URL!);

    const letterPlays = db
      .select()
      .from(tblLetterPlaysInAllThingsBattleRapPH)
      .where(ilike(tblLetterPlaysInAllThingsBattleRapPH.letterPlay, ilikeQuery))
      .orderBy(asc(tblLetterPlaysInAllThingsBattleRapPH.dateTimestamp));

    return await letterPlays;
  }

  async getUniqueVideos({ filters }: BattleLeagueFilters) {
    const db = drizzle(process.env.POSTGRES_URL!);

    let videos = db
      .selectDistinct({
        videoID: tblLetterPlaysInAllThingsBattleRapPH.videoID,
        videoName: tblLetterPlaysInAllThingsBattleRapPH.videoName,
        dateTimestamp: tblLetterPlaysInAllThingsBattleRapPH.dateTimestamp,
      })
      .from(tblLetterPlaysInAllThingsBattleRapPH)
      .$dynamic();

    const inArrays = [];

    if (filters.battleLeagues && filters.battleLeagues.length > 0) {
      inArrays.push(
        inArray(
          tblLetterPlaysInAllThingsBattleRapPH.battleLeague,
          filters.battleLeagues
        )
      );
    }

    if (filters.emcees && filters.emcees.length > 0) {
      inArrays.push(
        inArray(tblLetterPlaysInAllThingsBattleRapPH.rapper, filters.emcees)
      );
    }

    videos = videos
      .where(and(...inArrays))
      .orderBy(asc(tblLetterPlaysInAllThingsBattleRapPH.dateTimestamp));

    return await videos;
  }

  async getLetterPlaysByVideoID(videoID: string) {
    const db = drizzle(process.env.POSTGRES_URL!);

    const letterPlays = db
      .select()
      .from(tblLetterPlaysInAllThingsBattleRapPH)
      .where(eq(tblLetterPlaysInAllThingsBattleRapPH.videoID, videoID))
      .orderBy(asc(tblLetterPlaysInAllThingsBattleRapPH.timestampInSeconds));

    return await letterPlays;
  }
}

export class LetterPlays {
  #database: LetterPlaysDatabasePostgreSQL;

  constructor(database: LetterPlaysDatabasePostgreSQL) {
    this.#database = database;
  }

  async searchLetterPlays(query: string) {
    return await this.#database.search(query);
  }

  async getUniqueVideos({ filters }: BattleLeagueFilters) {
    return await this.#database.getUniqueVideos({ filters });
  }

  async getLetterPlaysByVideoID(videoID: string) {
    return await this.#database.getLetterPlaysByVideoID(videoID);
  }
}
