import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params: { id } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.error(new Error("Unauthorized"));
  }

  // const user = await prisma.user.findUnique({
  //     where: {
  //         email: session.user.email
  //     }
  // })

  const messages = await prisma.groupMessage.findMany({
    where: {
      groupId: parseInt(id),
    },
  });

  // let newmessages = await Promise.all(messages.map(async (message) => {
  //     const user = await prisma.user.findUnique({
  //         where: {
  //             id: message.userId
  //         }
  //     })
  //     return {
  //         ...message,
  //         name: user.name,
  //     }
  // }));

  const group = await prisma.group.findUnique({
      where: {
          id: parseInt(id)
      }
  })

  if (!messages) {
    return NextResponse.json({ messages: [] });
  }

  // return NextResponse.json({ messages: newmessages, user, group })
  return NextResponse.json({group, messages});
}
