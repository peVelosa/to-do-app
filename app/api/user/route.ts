// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createUser from "@/services/api/user/createUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, firstName, lastName, password } = await request.json();
  if (!email || !firstName || !lastName || !password)
    return NextResponse.json(
      { message: "All credentials must be provided" },
      { status: 202 }
    );
  try {
    await createUser({ email, firstName, lastName, password });
    return NextResponse.json({}, { status: 201 });
  } catch {
    return NextResponse.json({ err: "Email already exists" }, { status: 202 });
  }
}
