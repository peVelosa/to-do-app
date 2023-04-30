// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { formatPrisma } from "@/services/formatPrisma";
import createTodo from "@/services/api/todos/createTodo";
import getTodos from "@/services/api/todos/getTodos";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_Id = searchParams.get("user_Id");
  try {
    if (!user_Id) return NextResponse.json({ err: "Something went wrong" });
    const data = await getTodos({ user_Id });
    const formattedData = formatPrisma(data);
    return NextResponse.json(formattedData);
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(request: Request) {
  const { user_Id, newItem } = await request.json();
  if (!user_Id)
    return NextResponse.json({ err: "Something went wrong" }, { status: 404 });
  try {
    await createTodo({ newItem, user_Id });
    return NextResponse.json({}, { status: 201 });
  } catch {
    return NextResponse.json({ err: "Something went wrong" }, { status: 404 });
  }
}
