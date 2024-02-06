import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  const body = await request.json();

  const newmessage = await prisma.groupMessage.create({
    data: {
      message: body.message,
      groupId: parseInt(body.groupId),
      userId: body.userId,
    },
  });
  return NextResponse.json(newmessage, { status: 200 });
  // return NextResponse.json(body)
}
