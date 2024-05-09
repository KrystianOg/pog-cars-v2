create table email_verifications (
  created_at timestamp with time zone not null default current_timestamp,
	updated_at timestamp with time zone not null default current_timestamp,
	deleted_at timestamp with time zone,
  created_by int references users(id) on delete set null,
  --  
  id serial primary key,
  token text not null,
  watch_uuid text not null unique default gen_random_uuid() -- used for listening to sse verification changes
);

create or replace function check_verification_limit() returns trigger as $$
begin
  if exists (
    select 1
    from email_verifications
    where created_by = new.created_by
    and created_at >= current_timestamp - interval '5 minutes'
  ) then 
    raise exception 'Only one verification request allowed per user within 5 minutes';
  end if;
  return new;
end;
$$ language 'plpgsql';

create trigger enforce_verification_limit
before insert on email_verifications
for each row
execute function check_verification_limit();

-- not yet deployed if this was a case the migration would be more complicated
alter table users add column verified boolean not null default false;

