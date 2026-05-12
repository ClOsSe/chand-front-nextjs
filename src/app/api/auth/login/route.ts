import { NextResponse } from "next/server";
import { safeJson, proxyServerError } from "../../_utils/proxy-error";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function POST(request: Request) {
  try{

    const body = await request.json();

    const backendResponse = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await safeJson(backendResponse);

    const response = NextResponse.json(data, {
      status: backendResponse.status,
    });

    if (backendResponse.ok && data.token) {
      response.cookies.set("token", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  }catch {
    return proxyServerError();
  }

}