import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  price: z.number().int().nonnegative("Harga harus positif"),
  stock: z.number().int().nonnegative("Stok tidak boleh negatif"),
  isActive: z.boolean().optional(),
  imageUrl: z.string().url().or(z.string().length(0)).nullable().optional(),
});

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = productSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }
    const product = await prisma.product.create({
      data: {
        name: result.data.name,
        price: result.data.price,
        stock: result.data.stock,
        isActive: result.data.isActive ?? true,
        imageUrl: result.data.imageUrl === "" ? null : (result.data.imageUrl ?? null),
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
