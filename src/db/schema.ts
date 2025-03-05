import { pgTable, pgSchema, index, bigint, text, doublePrecision } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const allThingsBattleRapPH = pgSchema("allThingsBattleRapPH");


export const tblLetterPlaysInAllThingsBattleRapPH = allThingsBattleRapPH.table("tblLetterPlays", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	index: bigint({ mode: "number" }),
	letterPlay: text().notNull(),
	explanationOrContext: text().notNull(),
	timestamp: text().notNull(),
	rapper: text().notNull(),
	videoName: text().notNull(),
	videoURL: text().notNull(),
	date: text().notNull(),
	videoURLWithTimestamp: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	timestampInSeconds: bigint({ mode: "number" }),
	videoID: text().notNull(),
	dateTimestamp: doublePrecision(),
	battleLeague: text().notNull(),
}, (table) => [
	index("ix_allThingsBattleRapPH_tblLetterPlays_index").using("btree", table.index.asc().nullsLast().op("int8_ops")),
]);

export const tblWordPlaysInAllThingsBattleRapPH = allThingsBattleRapPH.table("tblWordPlays", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	index: bigint({ mode: "number" }),
	wordPlay: text().notNull(),
	explanationOrContext: text().notNull(),
	timestamp: text().notNull(),
	rapper: text().notNull(),
	videoName: text().notNull(),
	videoURL: text().notNull(),
	date: text().notNull(),
	"TODO Tasks": text(),
	isPerfectWordPlay: text(),
	videoURLWithTimestamp: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	timestampInSeconds: bigint({ mode: "number" }),
	videoID: text().notNull(),
	dateTimestamp: doublePrecision(),
	battleLeague: text().notNull(),
}, (table) => [
	index("ix_allThingsBattleRapPH_tblWordPlays_index").using("btree", table.index.asc().nullsLast().op("int8_ops")),
]);
