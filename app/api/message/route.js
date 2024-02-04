import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json()
    const newMessage = await prisma.groupMessage.create({
        data: {
            message: body.message,
            userId: body.userId,
            groupId: body.groupId
        }
    })
    return NextResponse.json( { message: "sent" }, { status: 200 })
}