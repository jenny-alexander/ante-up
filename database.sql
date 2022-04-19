
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    dob date
);
CREATE TABLE money (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE REFERENCES "user"(username),
    monthly_total integer,
    spend_total integer,
    spend_weekly integer,
    save_total integer,
    save_weekly integer,
    share_total integer,
    share_weekly integer,
    spend_weekly_deposited boolean DEFAULT false,
    save_weekly_deposited boolean DEFAULT false,
    share_weekly_deposited boolean DEFAULT false
);

