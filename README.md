# Project Setup

This document outlines the steps to set up and run the project using Docker and Prisma.

## Prerequisites

Before you begin, ensure you have the following tools installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js**: [Install Node.js](https://nodejs.org/) (for running npm commands inside the container)

## Setup Instructions

Follow these steps to set up and run the project:

### Step 1: Bring Up the Docker Containers

Start the Docker containers by running the following command:

```bash
docker compose up
```

This will set up and run the containers specified in your docker-compose.yml file. Wait until all services are fully up and running.

### Step 2: Apply database Migrations

After the containers are up, apply the Prisma migrations to set up the database schema:

```bash
docker exec -it db npx prisma migrate
```

This command will run the Prisma migrations inside the db service, which will configure your database schema.

### Step 3: Seed the Database

Once the migrations are applied, seed the database with initial data by running:

```bash
docker exec -it app npm run seed
```

This command will execute the seed script to insert default data into the database.

### Access the Application

Once everything is set up, your application should be running. If it's a web application, you can typically access it at:

http://localhost:3000

Or whatever port is specified in your docker-compose.yml or environment variables.
