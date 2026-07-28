# Mini POS — Xolvon Technical Test

Aplikasi Point of Sale (POS) sederhana untuk memenuhi technical test recruitment Web Developer Xolvon Project Incubator Program.

## 🚀 Fitur Utama
1. **Kasir POS**: Input transaksi, visual keranjang belanja, kalkulasi otomatis, validasi stok, dan checkout.
2. **Manajemen Produk (CRUD)**: Kelola katalog produk (Nama, Harga, Stok, Status Aktif/Nonaktif) dengan upload foto produk ke Supabase Storage.
3. **Riwayat Transaksi**: Lihat riwayat penjualan beserta detail item, kuantitas, dan snapshot harga beli pada saat transaksi.
4. **Keamanan & Integritas Data**: Seluruh kalkulasi harga dan validasi stok divalidasi ketat di sisi server (API) dan menggunakan database transactions (`$transaction`) untuk mencegah stok negatif.

## 🎨 Tech Stack & Desain
- **Frontend / Backend**: Next.js 14 (App Router) + TypeScript
- **Database**: PostgreSQL (Supabase) + Prisma ORM
- **Styling & UI**: Tailwind CSS (Desain flat & minimalis ala Claude.ai)
- **File Storage**: Supabase Storage (`product-images` bucket)

## 🔧 Persiapan & Instalasi

### 1. Environment Setup
Buat file `.env` di root direktori dengan menyalin `.env.example`:

```bash
DATABASE_URL="postgresql://username:password@host:port/database"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 2. Setup Database (Supabase SQL Editor)
Jalankan script schema yang disediakan di `supabase-schema.sql` pada SQL Editor Supabase Anda untuk membuat tabel dan data benih awal.

### 3. Jalankan Aplikasi
```bash
npm install
npx prisma generate
npm run dev
```

Aplikasi dapat diakses melalui [http://localhost:3000](http://localhost:3000).

## 🧪 Menjalankan Automated Tests
```bash
npm run test
```
