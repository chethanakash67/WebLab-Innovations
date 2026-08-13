# AigleOn Labs Backend

Render deploy target for the AigleOn Labs contact API and Postgres database.

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
- Email delivery uses the Resend API over HTTPS. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO`, and optionally `REVIEW_TO`.

## Lab assistant knowledge base

Everything the Lab chat assistant knows lives in `data/` as Markdown — it is never
hard-coded in the source. Add or edit a `.md` file there and restart the backend (or use
Admin → Reindex site content on the Lab page); only changed files are re-indexed, and
deleting a file removes that knowledge. Subfolders are supported and files prefixed with
`_` are ignored. See `data/_README.md` for the full conventions.

## Email

All outbound mail goes through Resend (`src/services/mailer.js`); there is no other mail
provider. The sending domain in `RESEND_FROM_EMAIL` must be verified in the Resend
dashboard or sends fail with a 403.

Messages sent:

- Contact enquiry confirmation (visitor) and copy (admin)
- Free-audit request confirmation (visitor) and copy (admin)
- Research subscription confirmation (subscriber) and copy (admin)
- Review submission confirmation (reviewer) and approval link (admin)
- Lab admin one-time sign-in code (`LAB_ADMIN_EMAILS`)
- Lab assistant knowledge-gap alert (`LAB_UNANSWERED_TO`) — sent only when a visitor asks
  an agency-related question the assistant cannot answer. Off-topic questions never
  trigger mail. Repeat questions are suppressed for `LAB_UNANSWERED_DEDUPE_DAYS` and
  alerts are capped at `LAB_UNANSWERED_MAX_PER_HOUR`.

Outside production, mail that cannot be delivered (missing key or unverified domain) is
logged to the console instead so local development still works.

## API

- `GET /health`
- `POST /api/contact`
- `GET /api/reviews`
- `POST /api/reviews`
- `GET /api/reviews/:id/approve?token=...`
- `POST /api/lab-chat/ask`
- `POST /api/lab-chat/admin/login/request`, `.../verify`
- `GET|POST /api/lab-chat/admin/documents`, `DELETE /api/lab-chat/admin/documents/:id`
- `POST /api/lab-chat/admin/reindex-site-content`
