import Link from "next/link";
import { ShoppingBag, Box, History } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white transition-all">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <ShoppingBag className="h-5 w-5 text-[#2563EB]" />
          <span className="text-base font-bold text-[#111827] tracking-tight">Mini POS</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-sm font-medium text-[#4B5563] hover:text-[#2563EB] transition-colors duration-150">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Kasir</span>
          </Link>
          <Link href="/products" className="flex items-center gap-1.5 sm:gap-2 text-sm font-medium text-[#4B5563] hover:text-[#2563EB] transition-colors duration-150">
            <Box className="h-4 w-4" />
            <span className="hidden sm:inline">Produk</span>
          </Link>
          <Link href="/transactions" className="flex items-center gap-1.5 sm:gap-2 text-sm font-medium text-[#4B5563] hover:text-[#2563EB] transition-colors duration-150">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Riwayat</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
