\# Multi-Environment Application Deployment Guide



\## 1. Project Overview



This project deploys a ticket-management application consisting of a React frontend, two Flask backend environments, and two isolated MongoDB instances. Docker Compose manages the application containers, networking, environment variables, and persistent database volumes.



The application was deployed and tested locally on Windows using Docker Desktop and PowerShell.



\## 2. Architecture



| Service | Container name | Port | Purpose |

|---|---|---|---|

| Frontend | frontend | 3000 | React application served by Nginx |

| Development backend | backend-dev | 3001 | Development ticket API |

| Production backend | backend-prod | 3002 | Production ticket API |

| Development database | mongo-dev | Internal 27017 | Development data |

| Production database | mongo-prod | Internal 27017 | Production data |



Docker Compose provides a shared internal network. The frontend's Nginx server proxies development and production API requests to their respective Flask services.



The two MongoDB services use separate database names and persistent volumes.



\## 3. Prerequisites



\- Windows 10/11

\- Docker Desktop running

\- Git

\- PowerShell

\- Web browser

\- Internet access to download images and dependencies



Verify the tools:



```powershell

docker --version

docker compose version

git --version

```



\## 4. Deployment



Run these commands from the project root:



```powershell

docker compose config

docker compose up --build -d

docker compose ps

```



The Compose configuration defines five services. Confirm that all application containers are running and both MongoDB services report a healthy status.



\## 5. Access URLs



| Application | URL |

|---|---|

| Frontend dashboard | http://localhost:3000 |

| Development page | http://localhost:3000/dev |

| Production page | http://localhost:3000/prod |

| Development API | http://localhost:3001/api/tickets |

| Production API | http://localhost:3002/api/tickets |



\## 6. Environment Configuration



Docker Compose passes `MONGO\_URI` to each Flask backend.



Development database URI:



`mongodb://mongo-dev:27017/devdb`



Production database URI:



`mongodb://mongo-prod:27017/proddb`



The application uses separate MongoDB containers and persistent volumes to isolate the two environments.



\## 7. API and Connectivity Tests



Test the development backend:



```powershell

Invoke-RestMethod http://localhost:3001/api/tickets | ConvertTo-Json -Depth 5

```



The response should identify the environment as `Development`.



Test the production backend:



```powershell

Invoke-RestMethod http://localhost:3002/api/tickets | ConvertTo-Json -Depth 5

```



The response should identify the environment as `Production`.



Test the development API through Nginx:



```powershell

Invoke-RestMethod http://localhost:3000/api/dev/tickets | ConvertTo-Json -Depth 5

```



Test the production API through Nginx:



```powershell

Invoke-RestMethod http://localhost:3000/api/prod/tickets | ConvertTo-Json -Depth 5

```



These proxy requests should return the matching environment. An empty `tasks` array is expected if no tickets have been added to the database.



\## 8. Logs and Troubleshooting



Check container status:



```powershell

docker compose ps

```



View recent logs:



```powershell

docker compose logs --tail=50

```



View backend logs:



```powershell

docker compose logs --tail=50 backend-dev backend-prod

```



If a container fails, inspect its logs and validate the Compose configuration. If a port is occupied, stop the conflicting process or change the host port mapping.



If a backend cannot connect to MongoDB, verify the database health status, service name, and `MONGO\_URI`.



\## 9. Shutdown



Stop the application:



```powershell

docker compose down

```



This retains the named database volumes.



To delete the volumes and stored database data intentionally:



```powershell

docker compose down -v

```



Use the second command with caution because it deletes persistent database data.



\## 10. Evidence



Store the actual deployment screenshots in the `evidence/` directory.



Recommended screenshots:



1\. Frontend dashboard.

2\. Development tickets page.

3\. Production tickets page.

4\. Direct API responses from both backends.

5\. Docker container status.

6\. Backend and frontend service logs.

7\. Nginx proxy connectivity tests.



Only screenshots that were actually captured should be included.



\## 11. Assumptions and Limitations



\- The deployment uses a local Windows environment rather than EC2.

\- MongoDB authentication and TLS are not configured.

\- The Flask applications currently use Flask's built-in development server with debug mode enabled. This is not appropriate for a real production deployment.

\- The frontend build currently disables the CRA ESLint plugin as a workaround for the observed ESLint/Jest configuration error.

\- Ports 3000, 3001, and 3002 must be available on the host.

\- Localhost URLs are intended for access from the deployment computer.



\## 12. Conclusion



The deployment demonstrates containerization of a React frontend and two Flask backend environments using Docker Compose. Direct API responses, frontend reverse-proxy requests, container status, and service logs provide evidence of application functionality and connectivity.

