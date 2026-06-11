function backendBaseUrl() {
  const configuredUrl =
    process.env.BACKEND_PUBLIC_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:10000");

  return configuredUrl.trim().replace(/\/+$/, "");
}

function envNumber(name: string, fallback: number) {
  const value = Number(process.env[name]);

  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export async function proxyBackendRequest(path: string, init: RequestInit = {}) {
  const baseUrl = backendBaseUrl();

  if (!baseUrl) {
    return Response.json(
      { success: false, message: "Backend API URL is not configured." },
      { status: 500 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    envNumber("BACKEND_REQUEST_TIMEOUT_MS", 20000),
  );

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      cache: "no-store",
      signal: controller.signal,
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
      {
        success: false,
        message:
          error instanceof Error && error.name === "AbortError"
            ? "Backend API request timed out. Please try again."
            : "Could not reach the backend API.",
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
