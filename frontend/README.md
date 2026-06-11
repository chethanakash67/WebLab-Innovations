# WebLab Frontend

Vercel deploy target for the WebLab agency site.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

`BACKEND_PUBLIC_URL` must point to the backend API. For local work, use:

```bash
BACKEND_PUBLIC_URL=http://localhost:10000
```

## Vercel

Set the Vercel project root to this `frontend` folder.

- Build command: `npm run build`
- Output: Next.js default
- Environment variable: `BACKEND_PUBLIC_URL=https://your-render-service.onrender.com`
- Redeploy after changing environment variables so Vercel rebuilds with the latest config.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
