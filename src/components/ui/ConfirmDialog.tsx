"use client";

import { useState } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Ya, Hapus",
  cancelLabel = "Batal",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md border border-[#E5E7EB] animate-scale-in">
        <h3 className="text-base font-bold text-[#111827] tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-[#4B5563]">{message}</p>
        <div className="mt-6 flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="h-10 rounded-lg border border-[#E5E7EB] px-4 text-sm font-medium text-[#4B5563] hover:bg-[#F9FAFB] active:scale-95 transition-all duration-100"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="h-10 rounded-lg bg-[#EF4444] px-4 text-sm font-medium text-white hover:bg-red-600 active:scale-95 transition-all duration-100"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
