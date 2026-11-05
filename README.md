# Student CRUD Application

Full-stack CRUD application for managing students.
- **Backend**: Spring Boot 3 + PostgreSQL (`/student`)
- **Frontend**: Vite + React + JavaScript + Tailwind CSS (`/frontend`)
- **Deployment**: Render Blueprint (`render.yaml`)

---

## Deployment to Render.com (Blueprint)

This repository includes a [`render.yaml`](./render.yaml) file configured to deploy the entire stack automatically via Render Blueprints:

1. **Push this repository to GitHub** under your account (`KendrickHugo`).
2. Go to [dashboard.render.com](https://dashboard.render.com/) and click **New +** > **Blueprint**.
3. Connect your GitHub repository.
4. Render will detect `render.yaml` and automatically provision:
   - **`student-db`**: Free PostgreSQL database (`db_student`).
   - **`student-backend`**: Dockerized Spring Boot web service (with auto-injected database credentials & SSL mode `require`).
   - **`student-frontend`**: Static Vite React site with rewrite routes and `VITE_API_BASE_URL` pointing to the backend.
5. Click **Apply**.

---

## Local Development

### 1. Start the Spring Boot Backend API
Ensure PostgreSQL is running locally with database `db_student` (credentials in `student/src/main/resources/application.properties`).

```powershell
cd student
.\mvnw.cmd spring-boot:run
```
> The API will be available at `http://localhost:8080/hugo/students`.

---

### 2. Start the Vite React Frontend
```powershell
cd frontend
npm.cmd run dev
```
> The frontend dev server will launch at `http://localhost:5173`.
> In local development, all requests to `/hugo/students` are automatically proxied to `http://localhost:8080`.

---

## Features
- **In-Page Split Layout**: Left form panel, right directory table (strict **No-Modal** design).
- **Create**: Add student with instant form validation and toast feedback.
- **Read**: Live search by name, course, or section; dynamic course filtering.
- **Update**: Click "Edit" on any student to load details into the form and save changes.
- **Delete**: Inline confirmation prompt (`[Delete?] [Yes] [No]`) directly on the row to prevent accidental deletion without popups.
- **Tailwind CSS**: Modern responsive styling, badge indicators, and animated loading skeletons.
