import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  const usergroup = await prisma.groupMember.findMany({
    where: {
      memberId: session.user.id,
    },
  });


  const groupList = await Promise.all(
    usergroup.map(async (g) => {
      const group = await prisma.group.findUnique({
        where: {
          id: g.groupId,
        },
      });
      return group;
    })
  );

  return NextResponse.json(groupList);
}
