// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getUser from "@/utils/user/getUser";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const data = await getUser({ id });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ err: "Email already exists" }, { status: 202 });
  }
}
