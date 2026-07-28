"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

const LOCAL_STORAGE_KEY = "mini-pos-cart";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  };

  const addToCart = (product: Product) => {
    const existingIndex = cartItems.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const currentQty = cartItems[existingIndex].quantity;
      if (currentQty >= product.stock) return; // Prevent exceeding stock
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      if (product.stock < 1) return;
      saveCart([...cartItems, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number, maxStock: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    if (quantity > maxStock) return; // Prevent exceeding stock
    const updated = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const removeFromCart = (productId: string) => {
    const updated = cartItems.filter((item) => item.product.id !== productId);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
  };
}
