// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createTask from "@/services/api/task/createTask";
import updateTask from "@/services/api/task/updateTask";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, to_do_Id } = await request.json();
  if (!title || !to_do_Id)
    return NextResponse.json({ err: "Something went wrong" }, { status: 404 });
  try {
    await createTask({ title, to_do_Id });
    return NextResponse.json({}, { status: 201 });
  } catch {
    return NextResponse.json("Something went wrong", { status: 404 });
  }
}
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const done = searchParams.get("done");
  const boolDone = done === "true";

  if (!id) return NextResponse.json({ err: "Something went wrong" });

  try {
    await updateTask({ id, done: boolDone });
    return NextResponse.json({}, { status: 201 });
  } catch {
    return NextResponse.json({ err: "Something went wrong" }, { status: 404 });
  }
}
