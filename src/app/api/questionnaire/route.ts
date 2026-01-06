import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { questionnaireSchema } from "@/lib/validations/questionnaire";

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = questionnaireSchema.parse(body);

    // Save to database
    const userResponse = await prisma.userResponse.create({
      data: {
        userId: session.user.id,
        responses: validatedData,
      },
    });

    return NextResponse.json({
      success: true,
      id: userResponse.id,
    });
  } catch (error) {
    console.error("Error saving questionnaire:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid data", details: error },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's latest response
    const userResponse = await prisma.userResponse.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!userResponse) {
      return NextResponse.json({ response: null });
    }

    return NextResponse.json({
      response: userResponse.responses,
      createdAt: userResponse.createdAt,
    });
  } catch (error) {
    console.error("Error fetching questionnaire:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
