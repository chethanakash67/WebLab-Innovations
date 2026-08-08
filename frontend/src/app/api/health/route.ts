import { proxyBackendRequest } from "@/lib/backendProxy";

export async function GET() {
  return proxyBackendRequest("/health", {
    method: "GET",
  });
}
