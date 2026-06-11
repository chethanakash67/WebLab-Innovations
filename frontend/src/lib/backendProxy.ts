function backendBaseUrl() {
  const configuredUrl =
    process.env.BACKEND_PUBLIC_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:10000");

  return configuredUrl.trim().replace(/\/+$/, "");
}

export async function proxyBackendRequest(path: string, init: RequestInit = {}) {
  const baseUrl = backendBaseUrl();

  if (!baseUrl) {
    return Response.json(
      { success: false, message: "Backend API URL is not configured." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      cache: "no-store",
    });
    const body = await response.text();
    const headers = new Headers();
    const contentType = response.headers.get("content-type");

    headers.set("Cache-Control", "no-store");

    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    return new Response(body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Backend API request failed:", error);

    return Response.json(
      { success: false, message: "Could not reach the backend API." },
      { status: 502 },
    );
  }
}
