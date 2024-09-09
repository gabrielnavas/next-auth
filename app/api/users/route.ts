import { db as prisma } from "@/lib/db";

import bcrypt from 'bcrypt';

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, email, password } = data

  const requiredData = ['name', 'email', 'password'];
  for (let key of requiredData) {
    if (typeof data[key] !== 'string' || data[key].length === 0) {
      return NextResponse.json({
        message: `missing ${key}`,
      }, { status: 400 });
    }
  }

  const userByEmail = await prisma.user.findUnique({
    where: {
      email,
    }
  })
  if (userByEmail !== null) {
    return NextResponse.json({
      message: `user already exists with email ${email}`,
    }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync());

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    }
  })


  return NextResponse.json({
    data: { id: user.id, name, email, password },
    message: 'user created'
  }, { status: 201 });
}