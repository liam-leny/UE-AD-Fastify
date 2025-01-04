# Todo List Application

A simple task management application consisting of a **backend API** built with Fastify and a **frontend** developed with React. The project uses **Docker** for orchestration and is ready for quick deployment.

## **Features**

- **Backend**:

  - REST API to manage tasks (CRUD).
  - Automatic endpoint documentation via OpenAPI.
  - Generation of a TypeScript client for the frontend.

- **Frontend**:

  - Modern user interface built with React.
  - Consumption of API endpoints via the generated TypeScript client.

- **Docker Orchestration**:
  - Containerization of both frontend and backend.
  - Ready to be used locally or deployed to a server.

## **Prerequisites**

- [Docker](https://www.docker.com/) installed.
- (Optional) [Node.js](https://nodejs.org/) if you wish to run the applications locally without Docker.

## **Installation and running**

### **With Docker**

1. Build and start the containers

   ```bash
   docker compose up --build
   ```

2. Access the application

- Frontend : http://localhost:8080
- Backend : http://localhost:3000

### **Run locally without Docker**

1. Backend

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   The API will be accessible at http://localhost:3000.

2. Frontend

   ```bash
   cd frontend
   npm install
   npm run start
   ```

   The user interface will be accessible at http://localhost:3006.

## Authors

- **Liam LE NY**
- **Baptiste BAYCHE**
