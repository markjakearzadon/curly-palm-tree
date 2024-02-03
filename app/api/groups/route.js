import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET(request) {
    const groups = await prisma.group.findMany()

    return NextResponse.json(groups)
}