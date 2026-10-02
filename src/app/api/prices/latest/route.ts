import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { proxyServerError, safeJson } from "../../_utils/proxy-error";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/prices/latest`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    });

    const data = await safeJson(backendResponse);
    const response = NextResponse.json(data, {
      status: backendResponse.status,
    });

    // A rejected token must not keep the user trapped on the protected page.
    if (backendResponse.status === 401) {
      response.cookies.delete("token");
    }

    return response;
  } catch {
    return proxyServerError();
  }
}
