"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Transaction } from "@/types";
import { Eye, Calendar, DollarSign, Tag, X } from "lucide-react";
import { TransactionSkeleton } from "@/components/ui/Skeletons";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/transactions");
      const data = await res.json();
      if (Array.isArray(data)) {
        setTransactions(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function formatDate(dateStr: string | Date) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-6 sm:py-8 animate-fade-in">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">Riwayat Transaksi</h1>
        <p className="text-xs sm:text-sm text-[#4B5563] mt-1">Daftar transaksi penjualan yang telah diselesaikan</p>
      </div>

      <div className="mt-8 rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[#F9FAFB] text-xs font-semibold uppercase text-[#4B5563] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-6 py-4">ID Transaksi</th>
                <th className="px-6 py-4">Waktu</th>
                <th className="px-6 py-4">Jumlah Item</th>
                <th className="px-6 py-4">Total Pembayaran</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#111827]">
              {isLoading ? (
                <>
                  <TransactionSkeleton />
                  <TransactionSkeleton />
                  <TransactionSkeleton />
                </>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#9CA3AF]">
                    Belum ada riwayat transaksi
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => {
                  const itemsCount = tx.items.reduce((acc, item) => acc + item.quantity, 0);

                  return (
                    <tr key={tx.id} className="hover:bg-[#F9FAFB] transition-colors duration-150 animate-fade-in">
                      <td className="px-6 py-4 font-mono text-xs text-gray-500 max-w-[120px] truncate">{tx.id}</td>
                      <td className="px-6 py-4 font-medium text-xs sm:text-sm">{formatDate(tx.createdAt)}</td>
                      <td className="px-6 py-4 text-xs sm:text-sm">{itemsCount} pcs</td>
                      <td className="px-6 py-4 font-bold text-[#2563EB] text-xs sm:text-sm">{formatCurrency(tx.total)}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedTx(tx)}
                          className="inline-flex h-10 sm:h-8 items-center gap-1.5 rounded-lg border border-[#E5E7EB] px-3 text-xs font-medium text-[#4B5563] hover:bg-[#F9FAFB] active:scale-95 transition-all duration-100"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Detail</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-0 sm:p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full sm:max-w-lg h-full sm:h-auto rounded-none sm:rounded-xl bg-white p-6 shadow-md border-0 sm:border border-[#E5E7EB] relative flex flex-col justify-between sm:justify-start animate-scale-in overflow-y-auto">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#111827] tracking-tight">Detail Transaksi</h2>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full transition-colors active:scale-95"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="mt-1 text-[10px] text-[#9CA3AF] font-mono select-all truncate">{selectedTx.id}</p>

              <div className="mt-6 border-y border-[#E5E7EB] py-4 space-y-3.5 text-xs">
                <div className="flex items-center gap-2 text-[#4B5563]">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-[#111827]">Waktu:</span>
                  <span>{formatDate(selectedTx.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-[#4B5563]">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-[#111827]">Total Pembayaran:</span>
                  <span className="font-bold text-[#2563EB] text-sm">{formatCurrency(selectedTx.total)}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold text-[#111827] flex items-center gap-1.5 uppercase tracking-wider">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span>Daftar Item</span>
                </h3>
                <div className="mt-3 overflow-y-auto max-h-[40vh] sm:max-h-60 border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB]">
                  {selectedTx.items.map((item) => (
                    <div key={item.id} className="p-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-[#111827]">{item.name}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          {formatCurrency(item.priceAtPurchase)} x {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-[#111827]">
                        {formatCurrency(item.priceAtPurchase * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex border-t border-[#E5E7EB] pt-4 sm:border-0 sm:pt-0 justify-end">
              <button
                onClick={() => setSelectedTx(null)}
                className="w-full sm:w-auto h-12 sm:h-10 rounded-lg bg-[#2563EB] px-6 text-sm font-medium text-white hover:bg-[#1D4ED8] active:scale-95 transition-all duration-100"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
