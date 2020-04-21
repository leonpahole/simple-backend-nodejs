# Very simple backend in nodejs

This is a backend that is extremely simplified. It is not really meant for anything else than quick prototyping or for demonstration purposes. It is NOT an example on how to write good node.js code or dockerize projects.

- Pure JS
- Yarn
- Dockerized, docker-compose'd
- SQL database (postgres) connection with sequelize
- Database admin
- Seeds + migrations
- Supports docker secrets
- Supports releasing docker images on docker hub or any other registry

## Generate seeds or migrations

`npx sequelize-cli migration:create --name name`
`npx sequelize-cli seed:generate --name name`

## Run in dev mode

`docker-compose build`
`docker-compose up -d`
`docker-compose exec api yarn migrate`
`docker-compose exec api yarn seed`

## Release

Copy `bin/release.env.example` to `bin/release.env`

`bash bin/release.sh`
