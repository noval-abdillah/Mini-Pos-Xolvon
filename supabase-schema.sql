-- Create Product Table
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- Create Transaction Table
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- Create TransactionItem Table
CREATE TABLE "TransactionItem" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceAtPurchase" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "TransactionItem_pkey" PRIMARY KEY ("id")
);

-- Add ForeignKey Constraints
ALTER TABLE "TransactionItem" ADD CONSTRAINT "TransactionItem_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TransactionItem" ADD CONSTRAINT "TransactionItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Insert Seed Data (Optional)
INSERT INTO "Product" ("id", "name", "price", "stock", "isActive", "createdAt", "updatedAt") VALUES
('1a3b5c7d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', 'Kopi Susu Gula Aren', 18000, 50, true, NOW(), NOW()),
('2b4c6d8e-0f1a-2b3c-4d5e-6f7a8b9c0d1e', 'Roti Bakar Cokelat', 15000, 30, true, NOW(), NOW()),
('3c5d7e9f-1a2b-3c4d-5e6f-7a8b9c0d1e2f', 'Es Teh Manis', 5000, 100, true, NOW(), NOW()),
('4d6e8f0a-2b3c-4d5e-6f7a-8b9c0d1e2f3a', 'French Fries', 12000, 3, true, NOW(), NOW()),
('5e7f9a1b-3c4d-5e6f-7a8b-9c0d1e2f3a4b', 'Croissant Mentega', 22000, 0, true, NOW(), NOW());
