import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();
    console.log("Request:", email, password); // Log the result

    const user = await prisma.user.findMany();

    const finalUser = user.find((user) => user.email === email);

    console.log("User fetched from Prisma:", user, finalUser); // Log the result\

    if (finalUser && password === finalUser.password) {
      return NextResponse.json(
        { message: "Login successful", user },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
