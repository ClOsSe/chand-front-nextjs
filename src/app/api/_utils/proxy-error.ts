import { NextResponse } from "next/server";

export async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return {
      message: response.ok ? "OK" : "Server returned invalid response",
    };
  }
}

export function proxyServerError() {
  return NextResponse.json(
    { message: "Server error" },
    { status: 500 }
  );
}