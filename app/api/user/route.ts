import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    console.log("Request:", email, password); // Log the result

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    // Use findUnique to fetch the user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email!,
      },
    });

    console.log("User fetched from Prisma:", user); // Log the result

    if (user && password === user.password) {
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
