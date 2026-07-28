"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Box } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { uploadProductImage } from "@/lib/supabase";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/ui/Toast";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateModal() {
    setEditingProduct(null);
    setName("");
    setPrice("");
    setStock("");
    setIsActive(true);
    setImageFile(null);
    setImagePreview(null);
    setErrorMessage("");
    setIsModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setIsActive(product.isActive);
    setImageFile(null);
    setImagePreview(product.imageUrl || null);
    setErrorMessage("");
    setIsModalOpen(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Format file harus berupa JPG, PNG, atau WEBP");
      addToast("Format file tidak valid", "error");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage("Ukuran file tidak boleh melebihi 2MB");
      addToast("Ukuran file melebihi 2MB", "error");
      return;
    }

    setErrorMessage("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    const parsedPrice = parseInt(price);
    const parsedStock = parseInt(stock);

    if (!name.trim()) {
      setErrorMessage("Nama produk harus diisi");
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setErrorMessage("Harga harus berupa angka positif");
      return;
    }
    if (isNaN(parsedStock) || parsedStock < 0) {
      setErrorMessage("Stok tidak boleh negatif");
      return;
    }

    try {
      setIsSubmitLoading(true);

      let uploadedUrl = editingProduct?.imageUrl || null;
      if (imageFile) {
        uploadedUrl = await uploadProductImage(imageFile);
      }

      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      const method = editingProduct ? "PATCH" : "POST";
      const body = { name, price: parsedPrice, stock: parsedStock, isActive, imageUrl: uploadedUrl };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menyimpan produk");
      }

      addToast(editingProduct ? "Produk berhasil diubah" : "Produk berhasil ditambahkan", "success");
      await fetchProducts();
      setIsModalOpen(false);
    } catch (err: any) {
      setErrorMessage(err.message || "Gagal menyimpan produk");
      addToast(err.message || "Gagal menyimpan produk", "error");
    } finally {
      setIsSubmitLoading(false);
    }
  }

  async function handleToggleActive(product: Product) {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !product.isActive }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, isActive: !product.isActive } : p))
        );
        addToast(product.isActive ? `"${product.name}" dinonaktifkan` : `"${product.name}" diaktifkan`, "success");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteConfirm() {
    if (!productToDelete) return;
    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
        addToast(`"${productToDelete.name}" berhasil dihapus`, "success");
      }
    } catch (err) {
      console.error(err);
      addToast("Gagal menghapus produk", "error");
    } finally {
      setProductToDelete(null);
    }
  }

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Daftar Produk</h1>
          <p className="text-sm text-[#4B5563] mt-1">Kelola katalog produk untuk transaksi POS</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex h-10 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-sm font-medium text-white hover:bg-[#1D4ED8] active:scale-[0.98] transition-all duration-100 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Produk</span>
        </button>
      </div>

      <div className="mt-8 rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <span className="text-sm text-[#4B5563] animate-pulse">Memuat produk...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center bg-white animate-fade-in">
            <p className="text-sm text-[#9CA3AF]">Belum ada produk</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-[#F9FAFB] text-xs font-semibold uppercase text-[#4B5563] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-6 py-4">Gambar</th>
                  <th className="px-6 py-4">Nama Produk</th>
                  <th className="px-6 py-4">Harga</th>
                  <th className="px-6 py-4">Stok</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-[#111827] animate-fade-in">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#F9FAFB] transition-colors duration-150">
                    <td className="px-6 py-4">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-10 w-10 object-cover rounded-lg border border-[#E5E7EB]"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-[#F3F4F6] flex items-center justify-center rounded-lg border border-[#E5E7EB]">
                          <Box className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-sm">{product.name}</td>
                    <td className="px-6 py-4 font-medium">{formatCurrency(product.price)}</td>
                    <td className="px-6 py-4">
                      {product.stock === 0 ? (
                        <span className="inline-flex items-center rounded-sm bg-red-50 px-2 py-0.5 text-xs font-semibold text-[#EF4444]">
                          Habis
                        </span>
                      ) : product.stock < 5 ? (
                        <span className="inline-flex items-center rounded-sm bg-amber-50 px-2 py-0.5 text-xs font-semibold text-[#F59E0B]">
                          Menipis ({product.stock})
                        </span>
                      ) : (
                        product.stock
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(product)}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors duration-150 ${
                          product.isActive
                            ? "bg-green-50 text-[#22C55E] hover:bg-green-100"
                            : "bg-gray-100 text-[#4B5563] hover:bg-gray-200"
                        }`}
                      >
                        {product.isActive ? "Aktif" : "Nonaktif"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-[#4B5563] hover:text-[#2563EB] rounded-lg hover:bg-[#F9FAFB] active:scale-95 transition-all duration-100"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setProductToDelete(product)}
                          className="p-2 text-[#4B5563] hover:text-[#EF4444] rounded-lg hover:bg-[#F9FAFB] active:scale-95 transition-all duration-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md border border-[#E5E7EB] animate-scale-in">
            <h2 className="text-lg font-bold text-[#111827] tracking-tight">
              {editingProduct ? "Ubah Produk" : "Tambah Produk Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 block h-10 w-full rounded-lg border border-[#E5E7EB] px-3 text-sm focus:border-[#2563EB] focus:outline-none transition-colors"
                  placeholder="Contoh: Kopi Susu"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider">Harga (Rp)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1.5 block h-10 w-full rounded-lg border border-[#E5E7EB] px-3 text-sm focus:border-[#2563EB] focus:outline-none transition-colors"
                    placeholder="Contoh: 15000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider">Stok</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="mt-1.5 block h-10 w-full rounded-lg border border-[#E5E7EB] px-3 text-sm focus:border-[#2563EB] focus:outline-none transition-colors"
                    placeholder="Contoh: 50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider">Foto Produk</label>
                <div className="mt-1.5 flex items-center gap-4">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded-lg border border-[#E5E7EB] animate-scale-in"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-[#F3F4F6] flex items-center justify-center rounded-lg border border-[#E5E7EB]">
                      <Box className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#F3F4F6] file:text-[#4B5563] hover:file:bg-gray-200 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveCheckbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <label htmlFor="isActiveCheckbox" className="text-sm font-medium text-[#4B5563] select-none">
                  Aktifkan Produk
                </label>
              </div>

              {errorMessage && <p className="text-xs text-[#EF4444] font-medium">{errorMessage}</p>}

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 rounded-lg border border-[#E5E7EB] px-4 text-sm font-medium text-[#4B5563] hover:bg-[#F9FAFB] active:scale-95 transition-all duration-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitLoading}
                  className="h-10 rounded-lg bg-[#2563EB] px-4 text-sm font-medium text-white hover:bg-[#1D4ED8] active:scale-95 disabled:opacity-50 transition-all duration-100"
                >
                  {isSubmitLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!productToDelete}
        title="Hapus Produk"
        message={`Apakah Anda yakin ingin menghapus "${productToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleDeleteConfirm}
        onClose={() => setProductToDelete(null)}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
