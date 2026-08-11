# Mini Task Tracker

Separate React and Flask applications for a small task tracker assignment.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` from `frontend/.env.example` and set:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

## Backend

```bash
cd backend
pip install -r requirements.txt
flask --app app init-db
flask --app app run
```

Optional backend environment variables:

```bash
DATABASE_URL=sqlite:///tasks.db
CORS_ORIGINS=http://localhost:5173,https://your-vercel-app.vercel.app
```

For Render, use `gunicorn app:app` as the start command and run `flask --app app init-db` before first use.
