import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params: { id }}) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.error(new Error("Unauthorized"))
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })
    
    const messages = await prisma.groupMessage.findMany({
        where: {
            groupId: parseInt(id)
        }
    })

    if (!messages) {
        return NextResponse.error(new Error("No messages found"))
    }

    return NextResponse.json({ messages, user })
}