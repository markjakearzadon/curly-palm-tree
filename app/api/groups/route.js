import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET(request) {
  const groups = await prisma.group.findMany();

  return NextResponse.json(groups);
}

export async function POST(request) {
  const body = await request.json();

  const newGroup = await prisma.group.create({
    data: {
      title: body.title,
      creatorId: body.creatorId,
    },
  });
  if (!newGroup)
    return NextResponse.json(
      { message: "Error creating group" },
      { status: 500 }
    );

    return NextResponse.json({ message: "Group created", newGroup }, { status: 201 });
}
