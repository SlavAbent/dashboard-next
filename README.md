<img width="1799" height="939" alt="Снимок экрана — 2026-06-26 в 17 16 43" src="https://github.com/user-attachments/assets/60cfbe4a-d65d-461d-bdb1-14639146aa11" />

D A S H B O A R D - N E X T

ADD TASKS
EDIT TASKS
DELETE TASKS
CREATE TASKS

FOLDERS, TASKS, KANBAN, TIME, POMODORO, WEATHER SEARCH, FLEXIBLE, DARK / LIGHT THEME and more...

STACK:

- REACT 18.3.1
- NEXT 15.5.18
- JSON MOCK SERVER
- ZUSTAND 5.0
- DND KIT
- TANSTACK
- LUCIDE ICONS
- ZOD
- TAILWIND 4
- SOCKET.IO

- ESLINT
- PRETTIER

- FSD

PLANS:

REMOVE JSON-SERVER -> POSTGRES / PRISMA / NODEJS/EXPRESS

GETTING STARTED

Make sure the following tools are installed:

Node.js 24+, npm, Colima, Docker CLI, Docker Compose

INSTALLATION:
Clone the repository and install dependencies:

git clone https://github.com/SlavAbent/dashboard-next.git
cd dashboard-next
npm install
Environment Variables

Create .env.local and configure the required environment variables:

DATABASE_URL=postgresql://postgres@localhost:5432/dashboard_db

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_SECRET=your_auth_secret
Start the Project

Start Colima: colima start
Make sure Docker uses the Colima context: docker context use colima

Start the development environment: npm run dev

The dev script automatically:

Starts the PostgreSQL container.
Validates the database connection.
Starts the backend API.
Starts the JSON Server.
Starts the Next.js development server.

The application is available at: http://localhost:3000

Stop the Project: colima stop
