-- permissions
create table permissions (
	created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  --
  id text not null primary key check (char_length(id) <=100),
  description text,
  rank int not null default 0 check (rank >= 0) 
);

comment on table permissions is 'Remember to modify the Permission type accordingly in src/types/db.ts';

-- define available permissions
insert into permissions (id, rank, description) values
  -- cars
	('view_cars', 0, 'Allows user to view all cars'),
	('manage_cars', 2, 'Allows user to modify all cars'),
	-- agencies
	('view_agency', 0, 'Allows user to view agencies'),
	('create_agency', 0, 'Allows user to create agency'),
	('update_agency', 8, 'Allows user to update agency'),
	('delete_agency', 10, 'Allows user to both soft and hard delete agency'),
	-- users
	('view_all_users', 3, 'Allows user to view other users within agency'),
	('modify_all_users', 4, 'Allows user to modify other users within agency'),
	-- roles & permissions
	('manage_all_roles', 7, 'Allows user to manage roles'),
	('view_all_roles', 6, 'Allows user to view roles'),
	('manage_permissions', 7, 'Allows user to manage permissions');

CREATE TRIGGER update_permissions_updated_at BEFORE UPDATE ON permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_column();


-- roles
create table roles (
	created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  created_by int references users(id) on delete set null,
  --
  agency_id int not null references agencies(id) on delete cascade,
  -- name within agency have to be unique
  name text not null CHECK (char_length(name) <= 32),
  primary key(agency_id, name),
  constraint no_duplicate_name unique (agency_id, name),
  description text
);

CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE PROCEDURE update_updated_column();


-- roles_permissions (through)
create table roles_permissions (
  id serial primary key,
	created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  created_by int references users(id) on delete set null,
  --
  agency_id int not null references agencies(id) on delete cascade,
  role_name text not null,
  foreign key (agency_id, role_name) references roles(agency_id, name) on delete cascade,
  permission_id text not null references permissions(id) on delete cascade
);

CREATE TRIGGER update_roles_permissions_updated_at BEFORE UPDATE ON roles_permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_column();


-- users_roles (through)
create table users_roles (
  id serial primary key,
	created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  created_by int references users(id) on delete set null,
  -- 
  user_id int not null references users(id) on delete cascade,
  agency_id int not null references agencies(id) on delete cascade,
  role_name text not null,
  foreign key (agency_id, role_name) references roles(agency_id, name) on delete cascade,
  expiration timestamp with time zone,
  constraint no_duplicate_role unique (user_id, agency_id, role_name)
);

CREATE TRIGGER update_users_roles_updated_at BEFORE UPDATE ON users_roles FOR EACH ROW EXECUTE PROCEDURE update_updated_column();


-- users_permissions (through)
create table users_permissions (
  id serial primary key,
	created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  created_by int references users(id) on delete set null,
  --
  user_id int not null references users(id) on delete cascade,
  agency_id int not null references agencies(id) on delete cascade,
  permission text not null references permissions(id) on delete cascade,
  expiration timestamp with time zone,
  constraint no_duplicate_permission unique (user_id, agency_id, permission) 
);

CREATE TRIGGER update_users_permissions_updated_at BEFORE UPDATE ON users_permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_column();
