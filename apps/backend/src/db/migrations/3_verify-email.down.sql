alter table users drop column verified;

drop trigger if exists enforce_verification_limit on email_verifications cascade;

drop function if exists check_verification_limit cascade;

drop table if exists email_verifications;
 
