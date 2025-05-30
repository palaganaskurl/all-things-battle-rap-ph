import { tblLetterPlaysInAllThingsBattleRapPH } from "@/db/schema";
import { BattleLeagueFilters } from "@/types/battles";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { getDb } from "@/modules/postgres";
import { BattlesPerPage } from "@/constants";

const db = getDb();

export class LetterPlaysDatabasePostgreSQL {
  constructor() {}

  async search(query: string) {
    const similarity = sql<number>`similarity("letterPlay", ${query})`;
    const letterPlays = db
      .select()
      .from(tblLetterPlaysInAllThingsBattleRapPH)
      .where(
        sql`${tblLetterPlaysInAllThingsBattleRapPH.letterPlay} % ${sql.param(
          query
        )} OR ${tblLetterPlaysInAllThingsBattleRapPH.letterPlay} ~ ${sql.param(
          `.*${query}.*`
        )}`
      )
      .orderBy(
        desc(similarity),
        asc(tblLetterPlaysInAllThingsBattleRapPH.dateTimestamp)
      );

    return await letterPlays;
  }

  async getUniqueVideos({ filters, pagination }: BattleLeagueFilters) {
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
      .limit(pagination?.perPage ?? BattlesPerPage)
      .offset(
        ((pagination?.page ?? 1) - 1) * (pagination?.perPage ?? BattlesPerPage)
      )
      .orderBy(
        asc(tblLetterPlaysInAllThingsBattleRapPH.dateTimestamp),
        asc(tblLetterPlaysInAllThingsBattleRapPH.videoName)
      );

    return await videos;
  }

  async getUniqueVideosCount({ filters }: BattleLeagueFilters) {
    let videosTotalCount = db
      .selectDistinct({
        count: sql<number>`count(distinct ${tblLetterPlaysInAllThingsBattleRapPH.videoID})`,
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

    videosTotalCount = videosTotalCount.where(and(...inArrays));

    return (await videosTotalCount)[0].count;
  }

  async getLetterPlaysByVideoID(videoID: string) {
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
    const decodedQuery = decodeURIComponent(query);

    return await this.#database.search(decodedQuery);
  }

  async getUniqueVideos({ filters, pagination }: BattleLeagueFilters) {
    return await this.#database.getUniqueVideos({ filters, pagination });
  }

  async getUniqueVideosCount({ filters }: BattleLeagueFilters) {
    return await this.#database.getUniqueVideosCount({ filters });
  }

  async getLetterPlaysByVideoID(videoID: string) {
    return await this.#database.getLetterPlaysByVideoID(videoID);
  }
}
