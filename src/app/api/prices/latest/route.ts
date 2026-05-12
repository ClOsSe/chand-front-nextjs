import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

   console.log("TOKEN:", token);
  console.log("BACKEND_URL:", BACKEND_URL);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const backendResponse = await fetch(`${BACKEND_URL}/prices/latest`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: `token=${token}`,
    },
  });

  const data = await backendResponse.json();

  return NextResponse.json(data, {
    status: backendResponse.status,
  });
}