import postgres from "postgres";
const {
   PG_USER,
   PG_PASS,
   PG_DB,
   DB_HOST,
   PG_PORT,
   PG_TEST_PORT,
   PG_TEST_DB,
   DB_TEST_HOST,
   IS_TEST_ENVIRONMENT,
} = process.env;

// Connection string and options object both work, even in containerized environment.

// export const sql = postgres(
//     `postgres://${PG_USER}:${PG_PASS}@${DB_HOST}:${PG_PORT}/${PG_DB}`
// );

const options = {
   host: DB_HOST,
   user: PG_USER,
   pass: PG_PASS,
   database: PG_DB,
   port: +PG_PORT,
};

const testOptions = {
   user: PG_USER,
   pass: PG_PASS,
   database: PG_TEST_DB,
   port: +PG_TEST_PORT,
   host: DB_TEST_HOST,
};

export const sql = postgres(IS_TEST_ENVIRONMENT ? testOptions : options);
// export const sql = postgres(IS_TEST_ENVIRONMENT ? testOptions : {});

export type SQL = typeof sql;
