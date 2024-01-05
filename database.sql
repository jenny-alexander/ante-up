
-- USER is a reserved keyword with Postgres - use double quotes
DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    age integer NOT NULL,
    type text,
    avatar character varying DEFAULT 'parrot'::character varying
);

DROP TABLE IF EXISTS week;
CREATE TABLE week (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    week_no integer,
    start_date date,
    end_date date,
    allowance_date date
);

DROP TABLE IF EXISTS chore;
CREATE TABLE chore (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text,
    description text,
    frequency text,
    payment integer,
    time text,
    user_id integer REFERENCES "user"(id)
);

DROP TABLE IF EXISTS bank;
CREATE TABLE bank (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer REFERENCES "user"(id),
    spend numeric DEFAULT '0'::numeric,
    save numeric DEFAULT '0'::numeric,
    share numeric DEFAULT '0'::numeric,
    goal_desc text,
    goal_amount numeric DEFAULT '0'::numeric
);

DROP TABLE IF EXISTS allowance;
CREATE TABLE allowance (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer REFERENCES "user"(id),
    allowance_date date,
    spend numeric DEFAULT '0'::numeric,
    save numeric DEFAULT '0'::numeric,
    spend_deposited boolean DEFAULT false,
    save_deposited boolean DEFAULT false,
    share_deposited boolean DEFAULT false,
    latest boolean,
    share numeric DEFAULT '0'::numeric,
    chore_money numeric,
    chore_deposited boolean DEFAULT false,
    week_id integer REFERENCES week(id)
);

DROP TABLE IF EXISTS user_chore;
CREATE TABLE user_chore (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    chore_id integer NOT NULL REFERENCES chore(id) ON DELETE CASCADE,
    user_id integer NOT NULL REFERENCES "user"(id),
    week_id integer
);

DROP TABLE IF EXISTS chore_payment_daily;
CREATE TABLE chore_payment_daily (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer REFERENCES "user"(id),
    chore_id integer REFERENCES chore(id) ON DELETE CASCADE,
    week_id integer,
    monday boolean DEFAULT false,
    tuesday boolean DEFAULT false,
    wednesday boolean DEFAULT false,
    thursday boolean DEFAULT false,
    friday boolean DEFAULT false,
    saturday boolean DEFAULT false,
    sunday boolean DEFAULT false,
    total_payment integer DEFAULT 0,
    user_chore_id integer REFERENCES user_chore(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS chore_payment_weekly;
CREATE TABLE chore_payment_weekly (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer,
    chore_id integer,
    week_id integer REFERENCES week(id),
    weekly boolean DEFAULT false,
    total_payment integer DEFAULT 0,
    user_chore_id integer REFERENCES user_chore(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS chore_payment_adhoc;
CREATE TABLE chore_payment_adhoc (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer,
    chore_id integer,
    week_id integer,
    adhoc boolean DEFAULT false,
    total_payment integer DEFAULT 0,
    user_chore_id integer REFERENCES user_chore(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS bank_transaction_history;
CREATE TABLE bank_transaction_history (
    id SERIAL PRIMARY KEY,
    type character varying(100) NOT NULL,
    date timestamp without time zone NOT NULL,
    amount character varying(100),
    user_id integer,
    notes text
);
