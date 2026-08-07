import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

export async function GET() {
  try {
    // Return the most recent project (first item in projects array)
    const recentProject = projects && projects.length > 0 ? projects[0] : null;
    
    return NextResponse.json({
      success: true,
      project: recentProject,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch recent project" },
      { status: 500 }
    );
  }
}
