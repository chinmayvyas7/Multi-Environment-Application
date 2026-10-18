# Multi-Environment Application

A containerized ticket management application demonstrating separate Development and Production environments using Docker Compose.

## Tech Stack

- Frontend: React
- Backend: Python and Flask
- Database: MongoDB
- Containerization: Docker
- Orchestration: Docker Compose
- Web server and reverse proxy: Nginx

## Architecture

| Service | Port | Purpose |
|---|---:|---|
| Frontend | 3000 | React application served by Nginx |
| Development Backend | 3001 | Development API |
| Production Backend | 3002 | Production API |
| Development MongoDB | Internal 27017 | Development database |
| Production MongoDB | Internal 27017 | Production database |

Development and Production use separate MongoDB containers and persistent Docker volumes.

## Project Structure

```text
Multi-Environment-Application/
├── backend/
│   ├── dev/
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── prod/
│       ├── app.py
│       ├── requirements.txt
│       └── Dockerfile
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── docs/
│   └── DEPLOYMENT.md
├── submission/
│   └── submission-info.txt
└── docker-compose.yml
```

## Prerequisites

- Docker Desktop installed and running
- Git installed

Verify your installation:

```bash
docker --version
docker compose version
```

## Run Locally

Clone the repository:

```bash
git clone https://github.com/chinmayvyas7/Multi-Environment-Application.git
cd Multi-Environment-Application
```

Build and start all services:

```bash
docker compose up --build -d
```

Check container status:

```bash
docker compose ps
```

## Application URLs

| Resource | URL |
|---|---|
| Frontend Home | http://localhost:3000 |
| Development UI | http://localhost:3000/dev |
| Production UI | http://localhost:3000/prod |
| Development API | http://localhost:3001/api/tickets |
| Production API | http://localhost:3002/api/tickets |

Nginx routes frontend API requests to the corresponding backend service.

## Verify the APIs

Run these commands in PowerShell:

```powershell
Invoke-RestMethod http://localhost:3001/api/tickets
Invoke-RestMethod http://localhost:3002/api/tickets
Invoke-RestMethod http://localhost:3000/api/dev/tickets
Invoke-RestMethod http://localhost:3000/api/prod/tickets
```

The responses identify the Development or Production environment. Ticket lists may be empty when no records exist.

## Useful Docker Commands

View logs:

```bash
docker compose logs -f
```

View individual service logs:

```bash
docker compose logs -f frontend
docker compose logs -f backend-dev
docker compose logs -f backend-prod
```

Stop the application:

```bash
docker compose down
```

**Warning:** `docker compose down -v` also deletes named database volumes and their stored data. Use it only when you intend to delete that data.

## Database Configuration

Development backend:

`mongodb://mongo-dev:27017/devdb`

Production backend:

`mongodb://mongo-prod:27017/proddb`

Docker Compose provides network-based service discovery for these database hostnames.

## Deployment Guide

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions, configuration, troubleshooting, and verification steps.

## Submission Details

See [submission/submission-info.txt](submission/submission-info.txt).

Repository: https://github.com/chinmayvyas7/Multi-Environment-Application

## Current Status

The application has been built and verified locally using Docker Compose. The frontend, both backend APIs, both MongoDB services, and the Nginx API proxy routes were tested successfully.

This confirms a local Docker deployment; it does not claim deployment to a cloud server.
