import { proxyBackendRequest } from "@/lib/backendProxy";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  return proxyBackendRequest(`/api/lab-chat/admin/documents/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      Authorization: request.headers.get("authorization") || "",
    },
  });
}
