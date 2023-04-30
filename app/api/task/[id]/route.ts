import deleteTask from "@/utils/task/deleteTask";
import { NextResponse } from "next/server";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id)
    return NextResponse.json({ err: "Something went wrong" }, { status: 404 });
  try {
    await deleteTask({ id });
    return NextResponse.json("Task deleted", { status: 201 });
  } catch {
    return NextResponse.json("Something went wrong", { status: 404 });
  }
}
