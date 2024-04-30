-- add created_by to every common table
ALTER TABLE addresses ADD created_by int references users(id);

ALTER TABLE agencies ADD created_by int references users(id);

ALTER TABLE cars ADD created_by int references users(id);

ALTER TABLE rentals ADD created_by int references users(id);

ALTER TABLE roles ADD created_by int references users(id);

ALTER TABLE roles_permissions ADD created_by int references users(id);

ALTER TABLE users_roles ADD created_by int references users(id);

ALTER TABLE users_permissions ADD created_by int references users(id);


