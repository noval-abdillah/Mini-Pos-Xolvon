import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi").optional(),
  price: z.number().int().nonnegative("Harga harus positif").optional(),
  stock: z.number().int().nonnegative("Stok tidak boleh negatif").optional(),
  isActive: z.boolean().optional(),
  imageUrl: z.string().url().nullable().optional(),
});

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = updateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }
    const product = await prisma.product.update({
      where: { id },
      data: result.data,
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
