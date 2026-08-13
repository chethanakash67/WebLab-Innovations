import { auth, isLabAuthEnabled } from "@/auth";
import { proxyBackendRequest } from "@/lib/backendProxy";

export async function POST(request: Request) {
  if (isLabAuthEnabled) {
    const session = await auth();
    if (!session) {
      return Response.json(
        { success: false, message: "Sign in to chat with the Lab assistant." },
        { status: 401 },
      );
    }
  }

  return proxyBackendRequest("/api/lab-chat/ask", {
    method: "POST",
    headers: {
      "Content-Type": request.headers.get("content-type") || "application/json",
    },
    body: await request.text(),
  });
}
