import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const isUserAlreadyJoin = await prisma.groupMember.findMany({
    where: {
      groupId: parseInt(body.id),
      memberId: body.userId,
    },
  });

  if (isUserAlreadyJoin.length === 0) {
    const newmember = await prisma.groupMember.create({
      data: {
        groupId: parseInt(body.id),
        memberId: body.userId,
      },
    });
    return NextResponse.json(newmember, { status: 201 });
  }
  return NextResponse.json(
    {
      message: "User already joined",
    },
    { status: 400 }
  );
}
