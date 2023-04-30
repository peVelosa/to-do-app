import deleteTodo from "@/services/api/todos/deleteTodo";
import updateTodo from "@/services/api/todos/updateTodo";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { params: string } }
) {
  const { id, title, description, status } = JSON.parse(params.params);
  if (!id || !title || !status)
    return NextResponse.json({ err: "Something went wrong" }, { status: 404 });
  try {
    await updateTodo({ id, title, description, status });
    return NextResponse.json({}, { status: 201 });
  } catch {
    return NextResponse.json({ err: "Something went wrong" }, { status: 404 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { params: string } }
) {
  const id = params.params;
  if (!id)
    return NextResponse.json({ err: "Something went wrong" }, { status: 404 });

  try {
    await deleteTodo({ id });
    return NextResponse.json({}, { status: 201 });
  } catch {
    return NextResponse.json({ err: "Something went wrong" }, { status: 404 });
  }
}
