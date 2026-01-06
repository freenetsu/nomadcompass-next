import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/helpers";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Vérification admin avec helper type-safe
    await requireAdmin();

    const { id } = await params;

    await prisma.countries.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting country:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
