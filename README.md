# Task Management System

A full-stack task management application built for the Full Stack Developer technical assessment.

## Live Demo

**Frontend:** `ADD_VERCEL_URL_HERE`

**Backend API:** `ADD_BACKEND_URL_HERE`

**GitHub:** `https://github.com/poojarythanish914-crypto/task-management-assessment`

---

## Tech Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Lucide React

### Backend

* NestJS
* TypeScript
* JWT authentication
* MongoDB
* Mongoose
* class-validator

---

## Features

* Guest Login with JWT authentication
* Create, view, edit and delete tasks
* Mark tasks as completed
* Task status management

  * Todo
  * In Progress
  * Completed
* Task priority

  * Low
  * Medium
  * High
* Due dates
* Search and filtering
* Light and dark themes
* Theme persistence across page refresh
* Responsive desktop, tablet and mobile layouts
* Reusable React components
* DTO validation in NestJS
* MongoDB persistence
* Protected task APIs
* API health endpoint

---

## Project Structure

```text
task-management-assessment/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── ...
│
├── backend/
│   └── src/
│       ├── auth/
│       ├── tasks/
│       ├── users/
│       └── ...
│
├── part-2/
│   └── product-analysis-template.md
│
├── .gitignore
└── README.md
```

---

## Requirements

* Node.js 20+
* npm
* MongoDB 7+ or MongoDB Atlas

---

## Run Locally

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/task_management_assessment
JWT_SECRET=replace-with-a-long-random-secret
CORS_ORIGIN=http://localhost:3000
```

Start the backend:

```bash
npm run start:dev
```

Backend:

```text
http://localhost:4000
```

API base URL:

```text
http://localhost:4000/api
```

### Frontend

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## Authentication

Guest authentication is handled through:

```http
POST /api/auth/guest
```

The API returns a JWT access token.

The frontend stores the token locally and sends it with protected task requests:

```http
Authorization: Bearer <token>
```

---

## API Endpoints

### Health

```http
GET /api/health
```

### Authentication

```http
POST /api/auth/guest
```

### Tasks

```http
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

Task endpoints require JWT authentication.

---

## Database

MongoDB is used for persistent task and user storage.

For local development:

```text
mongodb://127.0.0.1:27017/task_management_assessment
```

For production, MongoDB Atlas is used with the production `MONGODB_URI`.

---

## Theme Support

The application supports light and dark themes.

The selected theme is persisted in `localStorage`, allowing the user's theme preference to remain after refreshing the application.

---

## Responsive Design

The interface is designed for:

* Desktop
* Tablet
* Mobile

The layout adapts navigation, task cards, forms and controls according to screen size.

---

## Design & Architecture

### Frontend

The frontend uses Next.js App Router with reusable components for:

* Header
* Sidebar
* Task cards
* Task form
* Modal
* Buttons
* Theme management

API communication is centralized in:

```text
frontend/lib/api.ts
```

### Backend

NestJS follows a modular structure separating:

* Controllers
* Services
* DTOs
* Schemas
* Authentication
* Users
* Tasks

Validation is handled through NestJS validation pipes and DTOs.

---

## Part 2 — Product Analysis

The Part 2 submission covers the AbleSpace **Caseload → Take Data** workflow.

The submission includes:

* Workflow explanation
* Screenshots
* UX observations
* UI improvement suggestions
* Functionality improvement suggestions

See:

```text
part-2/
```

---

## Screenshots

Add final screenshots here before submission:

```text
screenshots/
├── dashboard-light.png
├── dashboard-dark.png
├── create-task.png
├── edit-task.png
└── mobile-view.png
```

---

## Production Deployment

The production architecture is:

```text
Next.js Frontend
        |
        | HTTPS API requests
        v
NestJS Backend
        |
        v
MongoDB Atlas
```

Production environment variables are configured separately from local development.

Before submission, the deployed frontend and backend are tested using a fresh/incognito browser session.

---

## Submission Checklist

* [x] Frontend implemented
* [x] Backend implemented
* [x] MongoDB persistence
* [x] Guest authentication
* [x] Task CRUD
* [x] Theme support
* [x] Responsive UI
* [x] GitHub repository
* [ ] Production frontend URL
* [ ] Production backend URL
* [ ] Part 2 screenshots and analysis
* [ ] Final README URLs
* [ ] Final end-to-end production test
