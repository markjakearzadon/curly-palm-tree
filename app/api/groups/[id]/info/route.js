import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  const group = await prisma.group.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const creator = await prisma.user.findUnique({
    where: {
      id: group.creatorId,
    },
  });

  const count = await prisma.groupMember.count({
    where: {
      groupId: parseInt(id),
    },
  });
  return NextResponse.json({ group, creator, count });
}
