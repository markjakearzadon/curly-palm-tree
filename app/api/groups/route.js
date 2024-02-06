import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  const groups = await prisma.group.findMany();

  return NextResponse.json(groups);
}

export async function POST(request) {
  const body = await request.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const newGroup = await prisma.group.create({
    data: {
      title: body.title,
      creatorId: session.user.id,
    },
  });

  if (!newGroup) {
    return NextResponse.json(
      { message: "Error creating group" },
      { status: 500 }
    );
  }

  const newmember = await prisma.groupMember.create({
    data: {
      memberId: session.user.id,
      groupId: newGroup.id,
    },
  });

  return NextResponse.json(
    { message: "Group created", newGroup },
    { status: 201 }
  );
}
