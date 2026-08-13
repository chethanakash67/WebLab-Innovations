import { proxyBackendRequest } from "@/lib/backendProxy";

function backendBaseUrl() {
  const configuredUrl =
    process.env.BACKEND_PUBLIC_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:10000");

  return configuredUrl.trim().replace(/\/+$/, "");
}

export async function GET(request: Request) {
  return proxyBackendRequest("/api/lab-chat/admin/documents", {
    method: "GET",
    headers: {
      Authorization: request.headers.get("authorization") || "",
    },
  });
}

// Uploads carry a multipart body — forward the raw stream instead of buffering
// it as text so proxyBackendRequest's text-based helper can't be reused here.
export async function POST(request: Request) {
  const baseUrl = backendBaseUrl();

  if (!baseUrl) {
    return Response.json(
      { success: false, message: "Backend API URL is not configured." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${baseUrl}/api/lab-chat/admin/documents`, {
      method: "POST",
      headers: {
        "Content-Type": request.headers.get("content-type") || "",
        Authorization: request.headers.get("authorization") || "",
      },
      body: request.body,
      duplex: "half",
      cache: "no-store",
    } as RequestInit);

    const body = await response.text();
    const headers = new Headers();
    const contentType = response.headers.get("content-type");

    headers.set("Cache-Control", "no-store");
    if (contentType) headers.set("Content-Type", contentType);

    return new Response(body, { status: response.status, headers });
  } catch (error) {
    console.error("Lab document upload proxy failed:", error);
    return Response.json(
      { success: false, message: "Could not reach the backend API." },
      { status: 502 },
    );
  }
}
