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
- `FRONTEND_URL` accepts a comma-separated list of frontend origins, for example `https://theaigleonlabs.dev,https://your-preview.vercel.app`
- Set `BACKEND_PUBLIC_URL` to the deployed backend URL so review approval links point to the right service
- Email delivery uses EmailJS over HTTPS. Set `EMAILJS_SERVICE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`, `EMAILJS_CONTACT_TEMPLATE_ID`, `EMAILJS_REVIEW_TEMPLATE_ID`, `CONTACT_TO`, and optionally `REVIEW_TO`.

## EmailJS Templates

The backend sends from the server only; do not add the private key to frontend env files.

Contact template setup:

- To Email: `{{to_email}}`
- Reply To: `{{reply_to}}`
- Subject: `{{subject}}`
- Content: `{{{body_html}}}`

The backend calls this same template twice: once for the WebLab notification and once for the customer confirmation.

Contact template params:

- `to_email`
- `reply_to`
- `from_name`
- `from_email`
- `name`
- `email`
- `phone`
- `project_type`
- `project_goal`
- `timeline`
- `budget`
- `subject`
- `body_text`
- `body_html`
- `message`

Review template params:

- `to_email`
- `reply_to`
- `from_name`
- `from_email`
- `name`
- `email`
- `role`
- `rating`
- `quote`
- `approve_url`
- `body_text`

## API

- `GET /health`
- `POST /api/contact`
- `GET /api/reviews`
- `POST /api/reviews`
- `GET /api/reviews/:id/approve?token=...`
