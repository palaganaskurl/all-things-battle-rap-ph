import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  schemaFilter: ["allThingsBattleRapPH"],
  tablesFilter: ["tblWordPlays", "tblLetterPlays"],
  introspect: {
    casing: "preserve",
  },
});
