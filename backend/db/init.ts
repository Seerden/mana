import postgres from "postgres";
const { PG_USER, PG_PASS, PG_DB, DB_HOST } = process.env;
const PG_PORT = 5432;

// Connection string and options object both work, even in containerized environment.

// export const sql = postgres(
//     `postgres://${PG_USER}:${PG_PASS}@${DB_HOST}:${PG_PORT}/${PG_DB}`
// );

export const options = {
   host: DB_HOST,
   user: PG_USER,
   password: PG_PASS,
   port: 5432,
} as const;

export const sql = postgres({ ...options, database: PG_DB });

export const testSql = postgres({ ...options, database: "mana_test" });
