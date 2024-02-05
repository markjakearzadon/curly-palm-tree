import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (user)
    return NextResponse.json(
      { message: "User already exist." },
      { status: 400 }
    );

  const hashedpassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      hashedPassword: hashedpassword,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
