"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export type ToastType = "success" | "error";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: ToastMessage; onClose: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2800);

    const removeTimer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-200 ${
        isExiting ? "animate-slide-out-right" : "animate-slide-in-right"
      }`}
    >
      {toast.type === "success" ? (
        <CheckCircle className="h-5 w-5 text-[#22C55E] shrink-0" />
      ) : (
        <XCircle className="h-5 w-5 text-[#EF4444] shrink-0" />
      )}
      <p className="text-sm font-medium text-[#111827]">{toast.message}</p>
    </div>
  );
}
