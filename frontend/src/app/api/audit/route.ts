import { proxyBackendRequest } from "@/lib/backendProxy";

export async function POST(request: Request) {
  return proxyBackendRequest("/api/audit", {
    method: "POST",
    headers: {
      "Content-Type": request.headers.get("content-type") || "application/json",
    },
    body: await request.text(),
  });
}
