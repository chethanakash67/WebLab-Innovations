import { proxyBackendRequest } from "@/lib/backendProxy";

export const dynamic = "force-dynamic";

export async function GET() {
  return proxyBackendRequest("/api/reviews", {
    method: "GET",
  });
}

export async function POST(request: Request) {
  return proxyBackendRequest("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": request.headers.get("content-type") || "application/json",
    },
    body: await request.text(),
  });
}
