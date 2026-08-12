import { isLabAuthEnabled } from "@/auth";

export async function GET() {
  return Response.json({ required: isLabAuthEnabled });
}
