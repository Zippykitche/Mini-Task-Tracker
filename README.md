# Mini Task Tracker

A full-stack, responsive web application for managing tasks with real-time status tracking, filtering, search, and full CRUD operations.

---

## Live Deployments

- 🌐 **Frontend Application (Vercel):** https://mini-task-tracker-nu.vercel.app/
- ⚙️ **Backend API (Render):** https://mini-task-tracker-wiis.onrender.com/


> **Note:** The backend is hosted on Render's free tier. The first request may take 30–60 seconds if the service is inactive. Subsequent requests are much faster.

---

## Table of Contents

- [Live Deployments](#live-deployments)
- [What Was Built](#what-was-built)
- [Project Structure](#project-structure)
- [Tech Stack & Rationale](#tech-stack--rationale)
- [How to Run (Setup & Commands)](#how-to-run-setup--commands)
  - [Prerequisites](#prerequisites)
  - [1. Running the Backend (Flask API)](#1-running-the-backend-flask-api)
  - [2. Running the Frontend (React + Vite)](#2-running-the-frontend-react--vite)
- [API Endpoints](#api-endpoints)
- [Assumptions & Shortcuts](#assumptions--shortcuts)

---

## What Was Built

The **Mini Task Tracker** is a full-stack task management application featuring:

- **Task Creation**: Create tasks with mandatory **Title**, optional **Description**, and initial **Status** (`To Do`, `In Progress`, `Done`).
- **Dashboard & Metrics**:
  - Live status counts for **All**, **To Do**, **In Progress**, and **Done** tasks.
  - Interactive status filter tabs.
  - Real-time search filter across titles and descriptions.
- **Task Editing & Status Updates**:
  - **Quick Status Switcher**: Update task status directly from the card with 1-click.
  - **Edit Details Modal**: Full popup modal to edit title, description, or status.
- **Task Deletion**: Delete tasks with an interactive confirmation prompt.


This project implements all the required assignment features, including full CRUD functionality, client-server communication over HTTP, input validation, and persistent data storage using SQLite.
---

## Project Structure

```text
Mini-Task-Tracker/
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

---

## Tech Stack & Rationale

### Frontend
- **React 19**: Component-based UI library for fast, declarative UI rendering and state management.
- **Vite 6**: Modern build tool providing instant Hot Module Replacement (HMR) and fast build bundling.
- **Tailwind CSS 3**: Utility-first CSS framework for clean, responsive design across desktop and mobile layout viewports.
- **Axios**: Promise-based HTTP client for simple request/response handling, timeout control, and error management.
- **React Router 7**: Client-side routing between Task List (`/`) and Task Creation (`/tasks/new`).

### Backend
- **Python 3.8+ / Flask 3.0**: Lightweight Python WSGI web framework for building RESTful APIs.
- **Flask-SQLAlchemy 3.1**: Object-Relational Mapping (ORM) for database schema definitions and query abstractions.
- **Flask-CORS 4.0**: Cross-Origin Resource Sharing middleware for seamless frontend-backend communication.
- **SQLite**: Zero-configuration relational database engine for local persistence.

---

## How to Run (Setup & Commands)

Follow these step-by-step instructions to run the application locally on any machine.

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher) & **npm**
- **Python** (v3.8 or higher) & **pip**

---

### 1. Running the Backend (Flask API)

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   python3 -m venv venv
   ```

3. Activate the virtual environment:
   - **Linux / macOS**:
     ```bash
     source venv/bin/activate
     ```
   - **Windows (Command Prompt / PowerShell)**:
     ```cmd
     venv\Scripts\activate
     ```

4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Initialize the database tables:
   ```bash
   flask init-db
   ```

6. Start the Flask backend server:
   ```bash
   python3 app.py
   ```
   The backend server will run at **`http://localhost:5000`**. You can verify it by opening `http://localhost:5000/api` in your browser.

---

### 2. Running the Frontend (React + Vite)

1. Open a **new terminal window** and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   To connect to your local backend, set:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   *(To test against the live production backend on Render, set: `VITE_API_BASE_URL=https://mini-task-tracker-wiis.onrender.com/api`)*

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   Open the local URL displayed in the terminal (typically **`http://localhost:5173`**) in your web browser.

---

## API Endpoints

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Get all tasks ordered by creation date | N/A |
| `POST` | `/api/tasks` | Create a new task | `{"title": "New Task", "description": "Details", "status": "To Do"}` |
| `PUT` | `/api/tasks/<id>` | Update task title, description, or status | `{"status": "In Progress"}` |
| `DELETE` | `/api/tasks/<id>` | Delete a task | N/A |
| `GET` | `/api` | Server healthcheck | N/A |

---

## Assumptions & Shortcuts

1. **Validation Requirements**:
   - **Title** is a mandatory field, while **Description** is optional. Creating or updating a task without a title will trigger validation feedback on the UI and HTTP 400 validation errors on the backend API.
   - Status values are strictly constrained to `"To Do"`, `"In Progress"`, and `"Done"`.


2. **Single-User Scope**:
   - Designed as a clean single-user task management application without multi-user authentication for streamlined assessment.
