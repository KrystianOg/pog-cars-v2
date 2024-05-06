-- general rules of thumb
-- i found this https://dba.stackexchange.com/a/21496 ->
-- it means that it is better to use text than varchar with length specified,
-- and if checking max length is needed it is better to use CHECK for this

-- enums 
-- https://stackoverflow.com/a/10984951
create type country_code as ENUM ('PL', 'DE', 'FR', 'US', 'UK');

create type drivetrain as ENUM ('FWD', 'RWD', '4WD', 'AWD');

-- on UPDATE update updated_at column
CREATE OR REPLACE FUNCTION update_updated_column()
	RETURNS TRIGGER AS $$
	BEGIN
		NEW.updated_at = current_timestamp;
		RETURN NEW;
	END;
$$ language 'plpgsql';

-- users
create table users (
  id serial primary key,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  deleted_at timestamp with time zone,
  --
  username text,
  email text not null CHECK (char_length(email) <= 320) unique,
  password text not null -- salted and hashed
);

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_column();

-- addresses
create table addresses (
    id serial primary key,
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp,
    deleted_at timestamp with time zone,
    created_by int references users(id) on delete set null,
    -- 
    street text not null, 
    city text not null,
    state text not null,
    postal_code text not null,
    country COUNTRY_CODE not null
);

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE PROCEDURE update_updated_column();

-- agencies
create table agencies (
    id serial primary key,
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp,
    deleted_at timestamp with time zone,
    created_by int references users(id) on delete set null,
    -- 
    --
    name text not null,
    address_id int not null references addresses(id) on delete cascade
);

CREATE TRIGGER update_agencies_updated_at BEFORE UPDATE ON agencies FOR EACH ROW EXECUTE PROCEDURE update_updated_column();

-- cars
create table cars (
    id serial primary key,
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp,
    deleted_at timestamp with time zone,
    created_by int references users(id) on delete set null,
    -- 
    --
    mileage int not null CHECK (mileage >= 0),
    horsepower int not null CHECK (horsepower >= 0),
    seats int not null CHECK (seats >= 0),
    drivetrain DRIVETRAIN not null,
    price int not null CHECK (price >= 0),
    year int not null CHECK (year >= 1886),
    model text not null,
    make text not null
);

CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars FOR EACH ROW EXECUTE PROCEDURE update_updated_column();

-- rentals

create table rentals (
    id serial primary key,
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp,
    deleted_at timestamp with time zone,
    created_by int references users(id) on delete set null,
    -- 
    --
    car_id int not null references cars(id) on delete cascade,
    user_id int not null references users(id) on delete cascade
);

CREATE TRIGGER update_rentals_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_column();
