# WebLab Backend

Render deploy target for the WebLab contact API and Postgres database.

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The server runs on `http://localhost:10000` by default.

## Render

Create a Render PostgreSQL database and a Web Service from this `backend` folder.

- Build command: `npm install`
- Start command: `npm start`
- Environment variables: copy `.env.example` and fill real values
- Use Render's internal Postgres `DATABASE_URL`
- Set `DATABASE_SSL=true` if your database connection requires SSL

## API

- `GET /health`
- `POST /api/contact`
- `GET /api/reviews`
- `POST /api/reviews`
- `GET /api/reviews/:id/approve?token=...`
