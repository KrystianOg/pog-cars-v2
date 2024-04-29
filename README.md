# Fake car rental company website

Fuck I've deleted the file by accident and it was not tracked will be back to writing it in a short while...

So what there was?

why this project, some time ago we (3 guys from WUST including me) created version one of this for project. I'm sure I'm much better now in this whole web dev stuff, and had no real better idea on what to do now as I have some spare time and I decided to make something web dev related so here we are, recreating some old app. But stay tuned I'm also thinking about creating some deep comparison of different node ORMs which will include TypeORM MikroORM, Drizzle, Prisma, Sequelize (and maybe some more?).

I'm mainly focusing on extending my backend knowledge, including message queues, websockets, tasks,

how to setup the app, something about docker, docker compose, github actions & stuff

Primarily installed kysely but due to its limited migration capabilities I moved to knex cause I didn't feel like migrating database by hand in production.

That was at first and then I just crate multiple migration .sql files in order for the sake of simplicity and thus removing another unnecessary layer of abstraction.

## The v1 features

- [ ] delete
