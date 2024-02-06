import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET(request) {
  const users = await prisma.user.findMany();

  if (!users)
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 404 }
    );

  return NextResponse.json(users, { status: 200 });
}
