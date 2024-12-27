-- Connect to the database
\c deepq

-- Drop tables in reverse dependency order to avoid errors
DROP TABLE IF EXISTS analysis CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS analytics CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop extension if it exists
DROP EXTENSION IF EXISTS "uuid-ossp";
