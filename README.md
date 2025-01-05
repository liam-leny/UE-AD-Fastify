# Todo List Application

A simple task management application consisting of a **backend API** built with Fastify and a **frontend** developed with React. The project uses **Docker** for orchestration and is ready for quick deployment.

## **Features**

- **Backend**:

  - REST API to manage tasks (CRUD).
  - Automatic endpoint documentation via OpenAPI.
  - Generation of a TypeScript client for the frontend.
  - Data stored in Redis

- **Frontend**:

  - Modern user interface built with React.
  - Consumption of API endpoints via the generated TypeScript client.

- **Docker Orchestration**:
  - Containerization of both frontend and backend.
  - Ready to be used locally or deployed to a server.
  - Redis service included for backend data storage.

## **Prerequisites**

- [Docker](https://www.docker.com/) installed.
- (Optional) [Node.js](https://nodejs.org/) if you wish to run the applications locally without Docker.
- (Optional) [A Redis instance running](https://redis.io/) if you wish to run the applications locally without Docker.

## **Installation and running**

### **With Docker**

1. Build and start the containers

   ```bash
   docker compose up --build
   ```

2. Access the application

- Frontend : http://localhost:8080
- Backend : http://localhost:3000
- Redis: Will be running internally within Docker on the `redis://db:6379` (not directly accessible unless needed for debugging).

### **Run locally without Docker**

1. Install Redis

   You can install Redis locally by following [Redis installation instructions](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/).

2. Redis configuration

   By default, Redis is running at `redis://localhost:6379`. Fix the connection url in the `backend/src/db/index.ts` file.

3. Backend

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   The API will be accessible at http://localhost:3000.

4. Frontend

   ```bash
   cd frontend
   npm install
   npm run start
   ```

   The user interface will be accessible at http://localhost:3006.

## Authors

- **Liam LE NY**
- **Baptiste BAYCHE**
