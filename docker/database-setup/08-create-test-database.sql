-- see https://stackoverflow.com/a/23611833/12820947

/* KILL ALL EXISTING CONNECTION FROM ORIGINAL DB (mana)*/
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity 
WHERE pg_stat_activity.datname = 'mana' AND pid <> pg_backend_pid();

/* CLONE DATABASE TO NEW ONE(mana_test) */
CREATE DATABASE mana_test WITH TEMPLATE mana OWNER postgres; -- Is there an easy way to inject environment variables into a .sql file?