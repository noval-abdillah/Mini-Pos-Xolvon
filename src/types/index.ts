export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
  imageUrl?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface TransactionItem {
  id: string;
  transactionId: string;
  productId: string;
  name: string;
  priceAtPurchase: number;
  quantity: number;
  product?: Product;
}

export interface Transaction {
  id: string;
  total: number;
  createdAt: string | Date;
  items: TransactionItem[];
}
