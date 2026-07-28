import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive("Kuantitas harus positif"),
      })
    )
    .min(1, "Keranjang tidak boleh kosong"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = checkoutSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Data input tidak valid" }, { status: 400 });
    }

    const { items } = result.data;

    // Use Prisma transaction to ensure stock consistency and atomicity
    const transaction = await prisma.$transaction(async (tx: any) => {
      let calculatedTotal = 0;
      const transactionItemsData = [];

      for (const item of items) {
        // Find product with write lock / row locking where supported, or simple check
        // We fetch the product details
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Produk dengan ID ${item.productId} tidak ditemukan`);
        }

        if (!product.isActive) {
          throw new Error(`Produk "${product.name}" sedang nonaktif`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Stok produk "${product.name}" tidak mencukupi. Tersedia: ${product.stock}`);
        }

        // Calculate item subtotal
        calculatedTotal += product.price * item.quantity;

        // Decrement stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        transactionItemsData.push({
          productId: product.id,
          name: product.name,
          priceAtPurchase: product.price,
          quantity: item.quantity,
        });
      }

      // Create transaction record
      const createdTx = await tx.transaction.create({
        data: {
          total: calculatedTotal,
          items: {
            create: transactionItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      return createdTx;
    });

    return NextResponse.json({
      success: true,
      transactionId: transaction.id,
      total: transaction.total,
      items: transaction.items,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process checkout" }, { status: 400 });
  }
}
