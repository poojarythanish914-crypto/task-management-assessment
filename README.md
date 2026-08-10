# Task Management System — Full Stack Assessment

A full-stack task management application built with Next.js App Router, TypeScript, Tailwind CSS, NestJS, MongoDB and JWT-based Guest Login.

> Important: the supplied Figma file could not be inspected from this environment. The implementation therefore follows the written assessment requirements with a polished responsive task-management UI. Replace/tune the design tokens and exact spacing/typography after comparing the app against the Figma file before submission.

## Features

- Guest Login with JWT
- Task CRUD
- Task status: Todo, In Progress, Completed
- Priority: Low, Medium, High
- Search and status filtering
- Responsive desktop/tablet/mobile UI
- Light/dark theme
- Theme persists in localStorage
- Reusable React components
- NestJS DTO validation
- MongoDB persistence
- Error handling
- API health endpoint
- Clean frontend/backend separation

## Project structure

```text
task-management-assessment/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── ...
├── backend/
│   └── src/
│       ├── auth/
│       ├── tasks/
│       ├── users/
│       └── ...
├── part-2/
│   └── product-analysis-template.md
└── README.md
```

## Requirements

- Node.js 20+
- MongoDB 7+ locally or MongoDB Atlas
- npm

## Run backend

```bash
cd backend
npm install
copy .env.example .env
npm run start:dev
```

On macOS/Linux:

```bash
cp .env.example .env
```

Backend runs at `http://localhost:4000`.

## Run frontend

```bash
cd frontend
npm install
copy .env.local.example .env.local
npm run dev
```

On macOS/Linux:

```bash
cp .env.local.example .env.local
```

Frontend runs at `http://localhost:3000`.

## Environment variables

Backend:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/task_management_assessment
JWT_SECRET=replace-with-a-long-random-secret
CORS_ORIGIN=http://localhost:3000
```

Frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## API

### Guest authentication

`POST /api/auth/guest`

Response:

```json
{
  "accessToken": "...",
  "user": {
    "id": "...",
    "name": "Guest User",
    "email": "guest@example.com"
  }
}
```

### Tasks

```text
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

All task endpoints require:

```text
Authorization: Bearer <token>
```

## Design decisions

- Next.js App Router keeps page structure simple and supports client components only where interaction/state is required.
- NestJS separates controllers, services, DTOs and schemas.
- MongoDB is used because tasks are naturally document-shaped and the assessment allows MongoDB.
- Guest Login creates/reuses a guest account and protects task APIs with JWT.
- Theme is stored locally so refreshes preserve the selected theme.
- Shared UI components reduce duplicated markup.

## Intentional deviations

Because the supplied Figma file was not accessible in the build environment, exact Figma measurements, font files, icons and illustrations should be checked manually before final submission. Do not claim pixel-perfect fidelity until you have performed that comparison.

## Part 2

See `part-2/product-analysis-template.md`. Add your own screenshots and observations after exploring AbleSpace → Caseload → Take Data.

## Production deployment

Recommended:

- Frontend: Vercel
- Backend: Render/Railway
- Database: MongoDB Atlas

Set production environment variables before deployment and verify the public URL from an incognito browser.
