# Student CRUD Application - Architecture & Implementation Plan

## 1. Executive Summary
This document outlines the architectural blueprint and phased implementation plan for the **Student CRUD Application** frontend, powered by **Vite**, **React**, and **JavaScript**, communicating with the existing Spring Boot REST API (`/hugo/students`).

---

## 2. Existing Backend API Context

### 2.1 Backend Specifications
- **Framework**: Spring Boot (Maven) located in `/student`
- **Database**: PostgreSQL (`db_student`) on `localhost:5432`
- **Default Server Port**: `http://localhost:8080`
- **Base Request Mapping**: `/hugo/students`

### 2.2 Data Model (`Student.java`)
```json
{
  "id": 1,
  "firstname": "John",
  "lastname": "Doe",
  "course": "BS Information Technology",
  "section": "IT-3A"
}
```

| Field Name  | Type    | Description                           | Generation / Rules |
|-------------|---------|---------------------------------------|-------------------|
| `id`        | Integer | Unique identifier                     | Auto-generated    |
| `firstname` | String  | First name of the student             | Required          |
| `lastname`  | String  | Last name of the student              | Required          |
| `course`    | String  | Degree program / Course (e.g. BSCS)   | Required          |
| `section`   | String  | Class section (e.g. 3A, 4B)           | Required          |

### 2.3 REST API Endpoints Matrix

| HTTP Method | Endpoint URI           | Request Body                        | Response Code / Body                     | Purpose                   |
|:------------|:-----------------------|:------------------------------------|:-----------------------------------------|:--------------------------|
| `GET`       | `/hugo/students`       | _None_                              | `200 OK` → `Student[]`                   | Fetch all student records |
| `GET`       | `/hugo/students/{id}`  | _None_                              | `200 OK` → `Student` or `404 Not Found`  | Get a student by ID       |
| `POST`      | `/hugo/students`       | `{ firstname, lastname, course, section }` | `201 Created` → Created `Student` object | Create a new student      |
| `PUT`       | `/hugo/students/{id}`  | `{ firstname, lastname, course, section }` | `200 OK` → Updated `Student` or `404`    | Update existing student   |
| `DELETE`    | `/hugo/students/{id}`  | _None_                              | `200 OK` → Status string or `404`        | Delete a student          |

### 2.4 CORS & Dev Proxy Strategy
Currently, `StudentController.java` does not declare `@CrossOrigin`. To prevent browser Cross-Origin Resource Sharing (CORS) blocks during development:
- **Primary Strategy**: Configure Vite dev proxy in `vite.config.js`:
  ```javascript
  server: {
    port: 5173,
    proxy: {
      '/hugo/students': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
  ```
- **Alternative / Production Strategy**: Add `@CrossOrigin(origins = "*")` to `StudentController.java` or declare a global WebMvcConfigurer in Spring Boot.

---

## 3. Frontend Architecture (Vite + React + JavaScript)

### 3.1 Proposed Directory Structure
The frontend will reside in `frontend/` alongside `student/`:

```
STUDENT-CRUD/
├── CONTEXT.md                    # Project context & architecture documentation
├── student/                      # Spring Boot backend API
└── frontend/                     # Vite + React (JavaScript) + Tailwind CSS
    ├── index.html
    ├── package.json
    ├── vite.config.js            # Vite configuration with API proxy
    ├── tailwind.config.js        # Tailwind CSS configuration
    ├── postcss.config.js         # PostCSS configuration
    ├── public/
    └── src/
        ├── main.jsx              # React DOM entry point
        ├── App.jsx               # Main application container & state coordination
        ├── index.css             # Tailwind CSS directives (@tailwind base, etc.)
        ├── api/
        │   └── studentApi.js     # Centralized fetch/axios API service calls
        ├── components/
        │   ├── Header.jsx        # App header & branding
        │   ├── StatsCards.jsx    # Metrics cards (total students, course count)
        │   ├── SearchBar.jsx     # Search & filter input controls
        │   ├── StudentForm.jsx   # In-page panel form for Add & Edit (NO MODAL)
        │   ├── StudentList.jsx   # Data table with search, badges, and inline actions
        │   ├── InlineConfirm.jsx # Inline or card-level delete confirmation banner
        │   └── Notification.jsx  # Toast alert notification component
```

---

## 4. Feature & UI/UX Specifications (Tailwind & Non-Modal Design)

### 4.1 Layout Concept: Split / In-Page Layout
Per requirements, **no modals** will be used. Instead, the application will use a modern, responsive **split / in-page layout**:
- **Desktop**: 
  - **Left Column / Side Panel**: Fixed or sticky **Student Form** (`StudentForm.jsx`) dedicated to adding a new student or editing the selected student. Includes clear "Create Student", "Update Student", and "Cancel Edit" controls.
  - **Right Column**: **Student Directory** (`StudentList.jsx`) with live search bar, stats bar, and interactive table.
- **Mobile / Responsive**:
  - Seamlessly stacks vertically: Form on top (collapsible or highlighted) and Table below.
- **Inline Delete Action**:
  - No delete modal. Deletion triggers an inline confirmation prompt directly within the row or a top action alert banner ("Delete John Doe? [Confirm] [Cancel]").

### 4.2 Styling with Tailwind CSS
- Clean modern color palette (slate/indigo/sky/emerald).
- Fully responsive grid and flexbox layouts.
- Accessible focus rings, hover transitions, and clean typography.
- Status badges for Course and Section.

### 4.3 Key Features
1. **Interactive Dashboard**:
   - Total students counter, unique courses counter, active section badges.
2. **In-Page Form (`StudentForm.jsx`)**:
   - Dynamic mode: switches between **"Add New Student"** and **"Edit Student #[id]"**.
   - Auto-fills inputs when an "Edit" button is clicked in the table.
   - "Cancel Edit" button reverts form to empty "Add" mode.
   - Client-side validation with Tailwind error highlights.
3. **Student Directory Table (`StudentList.jsx`)**:
   - Modern Tailwind table with zebra striping or subtle hover borders.
   - Real-time client-side search by name, course, or section.
   - Per-row actions: **Edit** (loads into side form) and **Delete** (inline confirmation).
   - Empty state illustration/message when no records match.
   - Animated loading skeleton while fetching data.
4. **Inline Confirmation**:
   - Row-level or banner-level delete confirmation ("Are you sure? Confirm / Cancel") without opening any popups or modals.
5. **Toast Notifications**:
   - Corner floating toast feedback (auto-dismissing after 3 seconds) for network success/error.

---

## 5. Step-by-Step Implementation Roadmap

| Phase | Milestone | Scope / Deliverables | Status |
|:------|:----------|:---------------------|:-------|
| **Phase 1** | **Planning & Documentation** | Audit backend API, define architecture, save context to repository. | **Completed** |
| **Phase 2** | **Project Initialization** | Scaffold Vite React JS app (`frontend`), install Tailwind CSS + PostCSS + Autoprefixer, configure `vite.config.js` proxy. | **Completed** |
| **Phase 3** | **API Service Layer** | Implement `studentApi.js` encapsulating `getAllStudents`, `getStudentById`, `createStudent`, `updateStudent`, `deleteStudent`. | **Completed** |
| **Phase 4** | **Component Development** | Build Header, StatsCards, SearchBar, in-page `StudentForm` (Add/Edit), `StudentList` table with inline actions, and Toast alerts (NO MODALS). | **Completed** |
| **Phase 5** | **State & Integration** | Connect state management in `App.jsx`, handle loading/error states, form validations, selected edit state. | **Completed** |
| **Phase 6** | **Testing & Verification** | Verified production build with Vite & Tailwind CSS compilation (0 errors). | **Completed** |
| **Phase 7** | **Render Deployment Setup** | Configured `render.yaml`, `student/Dockerfile`, environment variables, CORS `@CrossOrigin`, and dynamic `VITE_API_BASE_URL`. | **Completed** |

---

## 6. Execution Rules & Next Actions
> [!NOTE]
> As requested: **"MAKE A PLAN FIRST, No Coding. Save Context to repo."**
> No code has been scaffolded or edited yet. The project context is saved in this repository file (`CONTEXT.md`).
> Awaiting user confirmation to proceed with **Phase 2 (Project Initialization)**.
