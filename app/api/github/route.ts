import { NextResponse } from "next/server";
import { fetchGitHubRepos } from "@/lib/github";

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    const repos = await fetchGitHubRepos();
    return NextResponse.json(repos, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
