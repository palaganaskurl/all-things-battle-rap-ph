import { tblWordPlaysInAllThingsBattleRapPH } from "@/db/schema";
import { and, asc, eq, ilike, inArray, sql } from "drizzle-orm";
import { BattleLeagueFilters } from "@/types/battles";
import { db } from "@/modules/postgres";
import { BattlesPerPage } from "@/constants";

export class WordPlaysDatabasePostgreSQL {
  constructor() {}

  async search(query: string) {
    const ilikeQuery = `%${query}%`;

    const wordPlays = db
      .select()
      .from(tblWordPlaysInAllThingsBattleRapPH)
      .where(ilike(tblWordPlaysInAllThingsBattleRapPH.wordPlay, ilikeQuery))
      .orderBy(asc(tblWordPlaysInAllThingsBattleRapPH.dateTimestamp));

    return await wordPlays;
  }

  async getUniqueVideos({ filters, pagination }: BattleLeagueFilters) {
    let videos = db
      .selectDistinct({
        videoID: tblWordPlaysInAllThingsBattleRapPH.videoID,
        videoName: tblWordPlaysInAllThingsBattleRapPH.videoName,
        dateTimestamp: tblWordPlaysInAllThingsBattleRapPH.dateTimestamp,
      })
      .from(tblWordPlaysInAllThingsBattleRapPH)
      .$dynamic();

    const inArrays = [];

    if (filters.battleLeagues && filters.battleLeagues.length > 0) {
      inArrays.push(
        inArray(
          tblWordPlaysInAllThingsBattleRapPH.battleLeague,
          filters.battleLeagues
        )
      );
    }

    if (filters.emcees && filters.emcees.length > 0) {
      inArrays.push(
        inArray(tblWordPlaysInAllThingsBattleRapPH.rapper, filters.emcees)
      );
    }

    videos = videos
      .where(and(...inArrays))
      .limit(pagination?.perPage ?? BattlesPerPage)
      .offset(
        ((pagination?.page ?? 1) - 1) * (pagination?.perPage ?? BattlesPerPage)
      )
      .orderBy(
        asc(tblWordPlaysInAllThingsBattleRapPH.dateTimestamp),
        asc(tblWordPlaysInAllThingsBattleRapPH.videoName)
      );

    return await videos;
  }

  async getUniqueVideosCount({ filters }: BattleLeagueFilters) {
    let videosTotalCount = db
      .selectDistinct({
        count: sql<number>`count(distinct ${tblWordPlaysInAllThingsBattleRapPH.videoID})`,
      })
      .from(tblWordPlaysInAllThingsBattleRapPH)
      .$dynamic();

    const inArrays = [];

    if (filters.battleLeagues && filters.battleLeagues.length > 0) {
      inArrays.push(
        inArray(
          tblWordPlaysInAllThingsBattleRapPH.battleLeague,
          filters.battleLeagues
        )
      );
    }

    if (filters.emcees && filters.emcees.length > 0) {
      inArrays.push(
        inArray(tblWordPlaysInAllThingsBattleRapPH.rapper, filters.emcees)
      );
    }

    videosTotalCount = videosTotalCount.where(and(...inArrays));

    return (await videosTotalCount)[0].count;
  }

  async getWordPlaysByVideoID(videoID: string) {
    const wordPlays = db
      .select()
      .from(tblWordPlaysInAllThingsBattleRapPH)
      .where(eq(tblWordPlaysInAllThingsBattleRapPH.videoID, videoID))
      .orderBy(asc(tblWordPlaysInAllThingsBattleRapPH.timestampInSeconds));

    return await wordPlays;
  }
}

export class WordPlays {
  #database: WordPlaysDatabasePostgreSQL;

  constructor(database: WordPlaysDatabasePostgreSQL) {
    this.#database = database;
  }

  async searchWordPlays(query: string) {
    return await this.#database.search(query);
  }

  async getUniqueVideos({ filters, pagination }: BattleLeagueFilters) {
    return await this.#database.getUniqueVideos({ filters, pagination });
  }

  async getUniqueVideosCount({ filters }: BattleLeagueFilters) {
    return await this.#database.getUniqueVideosCount({ filters });
  }

  async getWordPlaysByVideoID(videoID: string) {
    return await this.#database.getWordPlaysByVideoID(videoID);
  }
}
