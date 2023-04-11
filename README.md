## Project structure

- Back-end:
	- Path: *./app-server*;
	- Tech stack: NestJS, Typescript, Prisma;
- Front-end:
	- Path: *./app-ui*;
	- Tech stack: NextJS, Typescript, Redux, Material UI;
- Database:
	- Path: *./db-data*;
	- Path will be created after running docker compose to have data persisted;
	- PostgreSQL;
- NodeJS problem:
  - Path: *./NodeJS-solution*;
  - This is my solution for the second part of the test;

## Start the application
Assure you have docker compose installed;
Run `docker compose up`;

This will build and run the database, the back-end server, will seed the database with 2 users and the front-end.

## Notes
Security was not a big concern in this phase;