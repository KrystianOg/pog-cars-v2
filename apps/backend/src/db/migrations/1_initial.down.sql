drop type if exists country_code cascade;
drop type if exists drivetrain cascade;

DROP FUNCTION IF EXISTS update_updated_column CASCADE;

DROP TRIGGER IF EXISTS update_addresses_updated_at ON addresses CASCADE;
drop table if exists addresses cascade;

DROP TRIGGER IF EXISTS update_agencies_updated_at ON agencies CASCADE;
drop table if exists agencies cascade;

DROP TRIGGER IF EXISTS update_users_updated_at ON users CASCADE;
drop table if exists users cascade;

DROP TRIGGER IF EXISTS update_cars_updated_at ON cars CASCADE;
drop table if exists cars cascade;

DROP TRIGGER IF EXISTS update_rentals_updated_at ON users CASCADE;
drop table if exists rentals cascade;
