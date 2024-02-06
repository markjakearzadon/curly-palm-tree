import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params: { id } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.error(new Error("Unauthorized"));
  }
  const messages = await prisma.groupMessage.findMany({
    where: {
      groupId: parseInt(id),
    },
  });

  const group = await prisma.group.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  let newmessages = await Promise.all(
    messages.map(async (message) => {
      const user = await prisma.user.findUnique({
        where: {
          id: message.userId,
        },
      });
      return {
        ...message,
        name: user.username || user.name || user.email,
      };
    })
  );

  if (!messages) {
    return NextResponse.json({ messages: [] });
  }

  return NextResponse.json({ group, messages: newmessages });
}
