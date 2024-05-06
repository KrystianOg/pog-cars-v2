DROP TRIGGER IF EXISTS update_permissions_updated_at ON permissions CASCADE;
drop table if exists permissions cascade;

DROP TRIGGER IF EXISTS update_roles_updated_at ON roles CASCADE;
drop table if exists roles cascade;

DROP TRIGGER IF EXISTS update_roles_permissions_updated_at ON roles_permissions CASCADE;
drop table if exists roles_permissions;

DROP TRIGGER IF EXISTS update_users_roles_updated_at ON users_roles CASCADE;
drop table if exists users_roles;

DROP TRIGGER IF EXISTS update_users_permissions_updated_at ON users_permissions CASCADE;
drop table if exists users_permissions;
