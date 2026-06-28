# School Result Processing System - Implementation Plan

## Scope Summary
Build a comprehensive, production-ready School Result Processing System for primary and secondary schools. The system will handle multiple user roles, school setup, student/teacher management, score entry, and automated result generation with high-quality PDF exports.

**Constraint Notice:** This implementation will be a frontend-driven application using `localStorage` for data persistence as per the session constraints (No Supabase/Database backend).

## Affected Areas
- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons, Shadcn UI components.
- **State Management:** React Context or a robust custom hook system for mock data persistence.
- **Reporting:** `jspdf` and `html2canvas` (or similar) for PDF generation.
- **Authentication:** Mock authentication system with role-based routing.

## Assumptions & Open Questions
- **Data Persistence:** Since no database is allowed, all data will reside in `localStorage`.
- **SaaS Multi-tenancy:** Will be simulated via a "School Switcher" or specific sub-paths for demo purposes.
- **Notifications:** In-app notifications will be implemented; Email/SMS will be mocked via console logs or UI toast messages.

## Ordered Phases

### Phase 1: Foundation & Layout (frontend_engineer)
- Set up project structure and routing (React Router).
- Implement the "Mock Auth" system (Login, Role-based guards).
- Create the Main Layout with Sidebar (responsive) and Navigation.
- **Deliverable:** Working login flow and empty dashboard shells for all 6 roles.

### Phase 2: Administrative Modules (frontend_engineer)
- **School Setup:** Form for school branding (logo, signature, settings).
- **Class/Subject Management:** CRUD for Classes, Arms, and Subjects.
- **User Management:** Registration forms for Teachers, Students, and Parents.
- **Deliverable:** Functional admin pages to configure the school and register users.

### Phase 3: Teacher Portal & Score Entry (frontend_engineer)
- **Subject Assignment UI:** View assigned subjects/classes.
- **Score Entry Form:** Manual entry and Bulk upload simulation (CSV parser).
- **Auto-Calculations:** Logic for CA, Total, Grade, and Remarks.
- **Approval Workflow:** Submission state management (Draft -> Submitted -> Approved/Rejected).
- **Deliverable:** Score entry interface with real-time grade calculations.

### Phase 4: Result Generation & Analytics (frontend_engineer)
- **Result Template:** A high-quality HTML/CSS template for report cards.
- **PDF Export:** Integration of a PDF library to download report cards.
- **Dashboards:** Role-specific charts using `recharts` or `Chart.js`.
- **QR Code:** Generate mock QR codes for verification.
- **Deliverable:** Professional-looking PDF results and data-rich dashboards.

### Phase 5: Student/Parent Portals & Polish (frontend_engineer)
- **Student View:** Result history and profile.
- **Parent View:** Child performance tracker.
- **Refinement:** Dark mode support, PWA configuration, and UI/UX polish.
- **Deliverable:** Completed student/parent experience and final mobile responsiveness.

---

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Foundation, Auth, and Layout.
2. frontend_engineer — Admin modules (School, Classes, Users).
3. frontend_engineer — Teacher portal and result calculation logic.
4. frontend_engineer — PDF generation and Dashboards.
5. frontend_engineer — Student/Parent portals and final polish.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4, 5
- **Scope:** Full frontend implementation including mock data layer using `localStorage`.
- **Files:** `src/App.tsx`, `src/components/*`, `src/pages/*`, `src/hooks/*`, `src/lib/mock-data.ts`.
- **Depends on:** none
- **Acceptance criteria:**
  - Login works for all 6 roles.
  - Admins can create classes and register students.
  - Teachers can enter scores and see auto-calculated grades.
  - Beautiful PDF report cards can be downloaded.
  - Responsive design works on mobile and desktop.
  - Data persists across page reloads (localStorage).
