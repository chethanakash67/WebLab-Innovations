import { proxyBackendRequest } from "@/lib/backendProxy";

export async function POST(request: Request) {
  return proxyBackendRequest("/api/lab-chat/admin/reindex-site-content", {
    method: "POST",
    headers: {
      Authorization: request.headers.get("authorization") || "",
    },
  });
}
