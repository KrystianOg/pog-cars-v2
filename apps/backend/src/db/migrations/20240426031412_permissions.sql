-- initial permissions

-- permissions
drop table if exists permissions cascade;

create table permissions (
	created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  --
  id text not null primary key check (char_length(id) <=100),
  description text
);

DROP TRIGGER IF EXISTS update_permissions_updated_at ON permissions CASCADE;
CREATE TRIGGER update_permissions_updated_at BEFORE UPDATE ON permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_column();


-- define available permissions

-- roles
drop table if exists roles cascade;

create table roles (
	created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  --
  agency_id int not null references agencies(id) on delete cascade,
  -- name within agency have to be unique
  name text not null CHECK (char_length(name) <= 32),
  primary key(agency_id, name),
  constraint no_duplicate_name unique (agency_id, name),
  description text
);

DROP TRIGGER IF EXISTS update_roles_updated_at ON roles CASCADE;
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE PROCEDURE update_updated_column();


-- roles_permissions (through)
drop table if exists roles_permissions;

create table roles_permissions (
  id serial primary key,
	created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  --
  agency_id int not null references agencies(id) on delete cascade,
  role_name text not null,
  foreign key (agency_id, role_name) references roles(agency_id, name) on delete cascade,
  permission_id text not null references permissions(id) on delete cascade
);

DROP TRIGGER IF EXISTS update_roles_permissions_updated_at ON roles_permissions CASCADE;
CREATE TRIGGER update_roles_permissions_updated_at BEFORE UPDATE ON roles_permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_column();


-- users_roles (through)
drop table if exists users_roles;

create table users_roles (
  id serial primary key,
	created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  -- 
  user_id int not null references users(id) on delete cascade,
  agency_id int not null references agencies(id) on delete cascade,
  role_name text not null,
  foreign key (agency_id, role_name) references roles(agency_id, name) on delete cascade,
  expiration timestamp with time zone
);

DROP TRIGGER IF EXISTS update_users_roles_updated_at ON users_roles CASCADE;
CREATE TRIGGER update_users_roles_updated_at BEFORE UPDATE ON users_roles FOR EACH ROW EXECUTE PROCEDURE update_updated_column();


-- users_permissions (through)
drop table if exists users_permissions;

create table users_permissions (
  id serial primary key,
	created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  --
  user_id int not null references users(id) on delete cascade,
  permission text not null references permissions(id) on delete cascade,
  expiration timestamp with time zone
);

DROP TRIGGER IF EXISTS update_users_permissions_updated_at ON users_permissions CASCADE;
CREATE TRIGGER update_users_permissions_updated_at BEFORE UPDATE ON users_permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_column();
