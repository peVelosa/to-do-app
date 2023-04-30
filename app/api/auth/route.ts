import getAuth from "@/utils/auth/getAuth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  if (!email || !password) return NextResponse.json({ err: "Error" });
  try {
    const { isAuth, data } = await getAuth({ email, password });
    if (!isAuth) return NextResponse.json({ err: "User not found" });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ err: "Path not found" });
  }
}
