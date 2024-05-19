# How to handle migrations?

migrations are sql files
/migration folder contains both up and down migrations naming conventino is as follows:

- for up migrations: `[id]_[name].up.sql`
- for down migrations: `[id]_[name].down.sql`

you can generate both up and down files running create.sh script located in bin directory, for example:
`./create.sh -n feature`\
if directory was empty this would generate following files:
`1_feature.up.sql` and `1_feature.down.sql`

to migrate run `migrate.sh` script the flags are:

- -u 'up' (default)
- -d 'down'
- -p 'dir'
- -db 'database' (default = 'postgres') useful to change when testing \
  for example:\
  `migrate.sh` or `migrate.sh -d`
