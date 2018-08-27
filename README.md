# Sample React/Redux/Loopback/PostgreSQL Application

## Overview

This is a sample project for an end-to-end application using React/Redux/Loopback.

## Table of Contents

### Application Overview

![Web](./docs/web.png)

The application has a `Login` and a `Dashboard` pages. The `Login` page enable users to signin to to see the `Dashboard`.

The `Dashboard` displays a list of contributors for the signed-in user. Users can also `invite` another contribuor or `unlink` an existing contribuor.

For the `invite`, the `api` is currently only logging a line in the `api` log.

Users can also `logout` by clicking on their photo on the dashboard header.

### Architecture Overview

The following main technologies are used:

#### database

- postgreSQL

#### api

- Express
- Loopback
- Jest

#### web

- React
- Redux
- Semantic UI

### Installation and Configuration

#### Docker Compose

1. Ensure the ports `3000`, `3001` and `5432` are not current in use. They are the default ports for the `web`, `api`, and `database` respectively.

2. Start all 3 containers: `database`, `api` and `web` with `docker-compose`

From the root folder of the project:

```bash
docker-compose up --build
```

3. Test the application using `http://localhost:3000/`

See [`test data`](api/database/data.js) for the sample data loaded by default. The email is the lastname with the domain `example.com`, for example `loris@example.com`.

4. (Optional) To clean up the containers:

```bash
docker-compose down --rmi all
docker system prune
```

**Tip**: You can also use Docker Compose to only start the `api` and the `database` when working on the `web` application with the command `docker-compose up --build database api`.

#### Kubernetes

1. Build the containers

2. Push the containers to a Container repository

3. Create the `service`, `deployment` and `secret` configuration files

4. Apply the above files to Kubernetes cluster

#### Database

The application used postgreSQL for the database and the memory for the end to end `api` tests.

To setup the database:

1. Set the database environment variable

```bash
export DATABASE_URL=postgres://collegebacker:password@127.0.0.1:5432/collegebacker
```

Fromt the `api` folder:

2. Install the `api` project

```bash
npm install
```

3. Populate the database

```bash
npm run database:create
npm run database:seed
```

You should now have sample test data in the database.

#### api

The application uses Loopback for the REST `api` framework.

To setup the `api` project`:

1. Install the `api` project

From the `api` folder:

```bash
npm install
```

2. Start the `api` application

Development:
```bash
npm run dev
```
Production:
```bash
npm run start
```

3. Start the database and populate with data

4. Test the `api` endpoints

See [`test data`](api/database/data.js) for the sample data loaded by default. The email is the lastname with the domain `example.com`, for example `loris@example.com`.

The following tools could be used for testing:
- Loopback explorer available at http://localhost:3001/explorer [only available in non-production, note that `docker-compose` is by default set for `production` environment]

![api](./docs/api.png)

- Insomnia with the [`workspace`](tools/insomnia/workspace.json) 

5. Run the `api` tests:

```bash
npm run test
```

#### web

The application uses React/Redux/Semantic for the `web` framework.

To setup the `web` project`:

1. Install the `web` project

From the `web` folder:

```bash
npm install
npm run build:semantic
```

2. Setup the envrionment variable, see [`env.sample`](web/env.sample).

3. Start the `api`

4. Start the `web` application 

Development:
```bash
npm run dev
```
Production:
```bash
npm run build:start
```

5. Test the `web` application connecting to http://localhost:3000

See [`test data`](api/database/data.js) for the sample data loaded by default. The email is the lastname with the domain `example.com`, for example `loris@example.com`.

## Project Folders

Name | Description
---- | -----
[`api`](api) | Back-end Loopback `api` application
[`database`](database) | Database
[`tools`](tools) | Tools such as Insomnia, Wait for It, etc.
[`web`](web) | Front-end reactJS/Redux `web` application

## To Dos

ID | Description
---- | ----
1 | Fix `npm audit` for both `web` and `api`
2 | Cleanup components, css for `web`
3 | Find a better Carousel component
4 | Build reusability between `Login` and `Dashboard` pagess
5 | Add more features (refresh, etc.)
6 | Add error handling
7 | Add test for the FE
