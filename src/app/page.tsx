"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types";
import { Plus, Minus, Trash2, ShoppingCart, Check, Box } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/ui/Toast";
import { ProductSkeleton } from "@/components/ui/Skeletons";

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccessData, setCheckoutSuccessData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const { toasts, addToast, removeToast } = useToast();
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart, total } = useCart();

  const [clickedProductId, setClickedProductId] = useState<string | null>(null);
  const [prevCartCount, setPrevCartCount] = useState(0);
  const [shouldBounceCart, setShouldBounceCart] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const currentCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    if (currentCount > prevCartCount) {
      setShouldBounceCart(true);
      const timer = setTimeout(() => setShouldBounceCart(false), 300000); // Reset class later, standard inline animations handle reset on re-renders
    }
    setPrevCartCount(currentCount);
  }, [cartItems, prevCartCount]);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) {
        const active = data.filter((p) => p.isActive);
        setProducts(active);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddToCart = (product: Product) => {
    setClickedProductId(product.id);
    addToCart(product);
    addToast(`"${product.name}" ditambahkan ke keranjang`, "success");
    setTimeout(() => setClickedProductId(null), 150);
  };

  async function handleCheckout() {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);
    setErrorMsg("");
    setCheckoutSuccessData(null);

    const payload = {
      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal melakukan checkout");
      }

      setCheckoutSuccessData(data);
      addToast("Transaksi berhasil diproses!", "success");
      clearCart();
      await fetchProducts();
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal melakukan checkout");
      addToast(err.message || "Gagal melakukan checkout", "error");
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-8 animate-fade-in">
      {checkoutSuccessData ? (
        <div className="mx-auto max-w-md rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm text-center animate-scale-in">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-[#22C55E] animate-scale-in">
            <Check className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-[#111827] tracking-tight">Transaksi Berhasil</h2>
          <p className="mt-1 text-xs text-[#4B5563]">Stok telah diperbarui dan transaksi dicatat.</p>

          <div className="mt-6 border-t border-[#E5E7EB] pt-4 text-left space-y-3 text-xs animate-fade-in">
            <div className="flex justify-between">
              <span className="text-[#4B5563]">ID Transaksi</span>
              <span className="font-mono text-[#111827] font-medium">{checkoutSuccessData.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4B5563]">Total Bayar</span>
              <span className="font-bold text-[#2563EB] text-sm">{formatCurrency(checkoutSuccessData.total)}</span>
            </div>
            <div className="mt-4 font-semibold text-[#111827] border-t border-dashed border-[#E5E7EB] pt-3">Daftar Item</div>
            <ul className="divide-y divide-[#E5E7EB] max-h-40 overflow-y-auto pr-1">
              {checkoutSuccessData.items?.map((item: any, idx: number) => (
                <li key={idx} className="py-2 flex justify-between">
                  <div className="min-w-0 pr-2">
                    <span className="font-medium text-[#111827] block truncate">{item.name}</span>
                    <span className="text-[10px] text-[#4B5563]">{formatCurrency(item.priceAtPurchase)} x {item.quantity}</span>
                  </div>
                  <span className="text-[#111827] font-medium self-center">{formatCurrency(item.priceAtPurchase * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setCheckoutSuccessData(null)}
            className="mt-6 w-full h-10 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-[#1D4ED8] active:scale-[0.98] transition-all duration-100"
          >
            Transaksi Baru
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Products Panel */}
          <div className="lg:col-span-2">
            <div>
              <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Kasir POS</h1>
              <p className="text-sm text-[#4B5563] mt-1">Pilih produk untuk ditambahkan ke keranjang</p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
              </div>
            ) : products.length === 0 ? (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-[#E5E7EB] bg-white p-6 mt-6">
                <span className="text-sm text-[#9CA3AF]">Katalog produk kosong atau nonaktif</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {products.map((product) => {
                  const cartItem = cartItems.find((item) => item.product.id === product.id);
                  const cartQty = cartItem?.quantity || 0;
                  const isOutOfStock = product.stock === 0;
                  const isMaxInCart = cartQty >= product.stock;
                  const isClicked = clickedProductId === product.id;

                  return (
                    <div
                      key={product.id}
                      className={`flex flex-col justify-between rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-sm hover:border-[#9CA3AF] transition-all duration-150 ${
                        isClicked ? "scale-95 duration-100" : ""
                      }`}
                    >
                      <div className="aspect-[4/3] w-full bg-[#F3F4F6] border-b border-[#E5E7EB] relative flex items-center justify-center overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <Box className="h-10 w-10 text-gray-400 stroke-1" />
                        )}
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="text-base font-semibold text-[#111827] tracking-tight">{product.name}</h3>
                          <p className="mt-1 text-base font-bold text-[#2563EB]">{formatCurrency(product.price)}</p>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <div>
                            {product.stock === 0 ? (
                              <span className="inline-flex items-center rounded-sm bg-red-50 px-2 py-0.5 text-xs font-semibold text-[#EF4444]">
                                Habis
                              </span>
                            ) : product.stock < 5 ? (
                              <span className="inline-flex items-center rounded-sm bg-amber-50 px-2 py-0.5 text-xs font-semibold text-[#F59E0B]">
                                Stok Menipis ({product.stock})
                              </span>
                            ) : (
                              <span className="text-xs text-[#4B5563]">Stok: {product.stock}</span>
                            )}
                          </div>

                          <button
                            disabled={isOutOfStock || isMaxInCart}
                            onClick={() => handleAddToCart(product)}
                            className="h-8 px-4 rounded-lg bg-[#2563EB] text-xs font-medium text-white hover:bg-[#1D4ED8] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-100"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Panel */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm flex flex-col justify-between h-[calc(100vh-140px)] sticky top-24">
            <div className="flex flex-col min-h-0 flex-1">
              <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-4">
                <ShoppingCart className={`h-5 w-5 text-[#2563EB] ${shouldBounceCart ? "animate-bounce-subtle" : ""}`} />
                <h2 className="text-lg font-bold text-[#111827] tracking-tight">Keranjang Belanja</h2>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 py-12 text-[#9CA3AF]">
                  <ShoppingCart className="h-10 w-10 stroke-1 text-gray-300" />
                  <p className="mt-3 text-sm">Keranjang masih kosong</p>
                </div>
              ) : (
                <div className="mt-4 divide-y divide-[#E5E7EB] overflow-y-auto flex-1 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-3.5 flex items-center justify-between animate-slide-in-right">
                      <div className="flex-1 min-w-0 pr-3">
                        <p className="font-semibold text-sm text-[#111827] truncate">{item.product.name}</p>
                        <p className="text-xs text-[#2563EB] font-bold mt-0.5 transition-all duration-200">{formatCurrency(item.product.price)}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#E5E7EB] rounded-lg px-1.5 py-0.5 bg-[#F9FAFB]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.product.stock)}
                            className="p-1 text-[#4B5563] hover:text-[#2563EB] transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-[#111827] transition-all duration-200">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.product.stock)}
                            className="p-1 text-[#4B5563] hover:text-[#2563EB] transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            removeFromCart(item.product.id);
                            addToast(`"${item.product.name}" dihapus dari keranjang`, "error");
                          }}
                          className="p-2 text-gray-400 hover:text-[#EF4444] rounded-lg hover:bg-[#F9FAFB] transition-colors duration-150"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#E5E7EB] pt-5 mt-4 bg-white">
              <div className="flex justify-between text-base font-bold text-[#111827]">
                <span>Total</span>
                <span className="text-[#2563EB] transition-all duration-200">{formatCurrency(total)}</span>
              </div>

              {errorMsg && <p className="mt-3 text-xs text-[#EF4444] font-medium">{errorMsg}</p>}

              <button
                disabled={cartItems.length === 0 || isCheckingOut}
                onClick={handleCheckout}
                className="mt-5 w-full h-11 rounded-lg bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1D4ED8] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-100 flex items-center justify-center gap-2 shadow-sm"
              >
                {isCheckingOut ? "Memproses..." : "Bayar / Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
