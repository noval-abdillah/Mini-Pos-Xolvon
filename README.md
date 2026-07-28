# Mini POS — Xolvon Technical Test

[![Next.js Version](https://img.shields.io/badge/next.js-v14.2.5-blue.svg)](https://nextjs.org/)
[![Prisma Version](https://img.shields.io/badge/prisma-v7.9.1-indigo.svg)](https://prisma.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Mini POS adalah aplikasi Point of Sale sederhana berbasis web yang dirancang untuk membantu kasir mengelola produk, keranjang belanja, memproses checkout secara instan, serta melacak riwayat transaksi secara real-time dengan jaminan integritas data di sisi server.

---

## 🚀 Fitur Utama

- **Kasir POS & Keranjang Belanja**: Antarmuka penjualan dual-panel interaktif. Kasir dapat menambah produk ke keranjang, menambah/mengurangi kuantitas secara responsif, dan menghitung total tagihan otomatis.
- **Validasi Stok & Harga Server-Side**: Mencegah race conditions dan manipulasi harga client-side dengan melakukan kalkulasi ulang harga serta pengurangan stok secara atomik menggunakan Prisma `$transaction` di backend.
- **Manajemen Produk (CRUD)**: Kelola katalog produk (Nama, Harga, Stok, Status Aktif/Nonaktif) disertai upload foto produk terintegrasi langsung ke Supabase Storage.
- **Riwayat Transaksi & Snapshot**: Daftar riwayat penjualan lengkap dengan modal detail transaksi. Menggunakan snapshot data nama dan harga produk pada saat transaksi dibeli (`priceAtPurchase`) agar integritas laporan keuangan tetap terjaga.
- **Aesthetic Minimalis & Micro-interactions**: Tampilan minimalis flat ala Claude.ai, dilengkapi transisi animasi responsif pada tombol, skeleton loading, dan sistem notifikasi toast.
- **Automated Testing**: Unit test komprehensif menggunakan Jest untuk memverifikasi logika bisnis transaksi kasir.

---

## 🎨 Tech Stack

- **Frontend / Backend API**: Next.js 14 (App Router) & TypeScript
- **Database**: PostgreSQL (Hosted on Supabase) & Prisma ORM
- **Object Storage**: Supabase Storage (`product-images` bucket)
- **Styling**: Tailwind CSS & Lucide Icons
- **Testing**: Jest & Babel

---

## 🔧 Panduan Instalasi

### 1. Kloning Repositori
```bash
git clone https://github.com/noval-abdillah/Mini-Pos-Xolvon.git
cd Mini-Pos-Xolvon
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env` di root direktori proyek Anda:
```bash
cp .env.example .env
```
Isi variabel dengan kredensial PostgreSQL dan Supabase Storage Anda:
```env
DATABASE_URL="postgresql://postgres.zctqtnpnrkjjkgaeieef:oIhHnSMuDX1FKqvc@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.zctqtnpnrkjjkgaeieef:oIhHnSMuDX1FKqvc@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres"

# Supabase Storage Configuration
NEXT_PUBLIC_SUPABASE_URL="https://zctqtnpnrkjjkgaeieef.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_8CTNgbP9lDupgPkh1pxckg_4AaFiEUp"
```

### 4. Setup Skema Database
Untuk memigrasikan tabel skema ke database postgres, jalankan perintah sinkronisasi Prisma:
```bash
npx prisma db push
npx prisma generate
```
*Catatan: Anda juga bisa mengeksekusi script SQL mentah di `supabase-schema.sql` melalui SQL Editor Supabase.*

---

## 💻 Cara Penggunaan (Usage)

### Menjalankan Server Lokal (Development)
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

### Menjalankan Automated Tests
```bash
npm run test
```

### Build Aplikasi untuk Produksi
```bash
npm run build
npm run start
```

---

## 📁 Struktur Folder

```text
Mini-Pos-Xolvon/
├── prisma/
│   └── schema.prisma        # Definisi database model Prisma
├── src/
│   ├── app/
│   │   ├── api/             # REST API routes (products, checkout, transactions)
│   │   ├── products/        # Halaman manajemen CRUD katalog produk
│   │   ├── transactions/    # Halaman riwayat transaksi penjualan
│   │   └── page.tsx         # Dashboard utama kasir POS & Keranjang
│   ├── components/
│   │   ├── layout/          # Layout Header navigasi global
│   │   └── ui/              # Komponen re-usable (ConfirmDialog, Skeletons, Toast)
│   ├── hooks/               # Custom React hooks (useCart, useToast)
│   ├── lib/                 # Utilitas global (prisma client, supabase client, formatter)
│   └── types/               # TypeScript Type Definitions
├── tests/
│   └── pos.test.ts          # Automated tests menggunakan Jest
├── .gitignore
├── package.json
└── README.md
```

---

## 📝 Catatan Tambahan (Asumsi & AI)
- **Asumsi Transaksi**: Stok tidak diperbolehkan bernilai negatif. Jika stok habis, tombol tambah akan otomatis dinonaktifkan di sisi frontend, dan request checkout ditolak di sisi server.
- **Penggunaan AI**: Aplikasi ini dibantu oleh AI-assisted development tools (OpenCode CLI & Newcombos) untuk mempercepat perancangan class style CSS Tailwind, kerangka skema Prisma, unit testing, dan pembuatan dokumentasi submission.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** — Lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

---

## 🤝 Kontak & Maintainer

Maintainer: **Noval Abdillah** — [santetgan123@gmail.com](mailto:santetgan123@gmail.com)
