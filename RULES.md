# 📐 Rules & Conventions

> **Proyek:** Mini POS — Xolvon Technical Test
> **Versi:** v1.0
> **Berlaku untuk:** Semua developer & AI yang bekerja di proyek ini

---

## 1. Tech Stack

| Layer | Teknologi | Versi |
|-------|-----------|-------|
| **Framework** | Next.js (App Router) | v14+ |
| **Language** | TypeScript | v5 |
| **Styling** | Tailwind CSS | v3 |
| **State Management** | React state / Context API (tidak butuh library eksternal untuk scope ini) | - |
| **Database** | PostgreSQL | - |
| **ORM** | Prisma | terbaru |
| **Auth** | Tidak wajib (di luar scope wajib) | - |
| **API** | REST via Next.js API Routes | - |
| **Deployment** | Vercel (app) + Neon/Supabase/Railway (Postgres) | - |

---

## 2. Struktur Folder

```
mini-pos/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── products/
│   │   │   ├── checkout/
│   │   │   └── transactions/
│   │   ├── products/          # halaman manajemen produk
│   │   ├── cart/               # halaman keranjang & checkout
│   │   └── transactions/       # halaman riwayat transaksi
│   ├── components/
│   │   ├── ui/                 # komponen generik (Button, Input, Card, dll)
│   │   ├── layout/              # Header, Sidebar, dll
│   │   └── features/            # komponen spesifik: ProductCard, CartItem, dll
│   ├── lib/                     # db client (prisma), validasi (zod), helpers
│   ├── hooks/                   # custom hooks (mis. useCart)
│   ├── types/                   # TypeScript type definitions
│   └── constants/
├── tests/
├── public/
├── .env.example
├── PRD.md
├── StyleGuide.md
├── Tasks.md
├── RULES.md
└── CONTEXT.md
```

---

## 3. Naming Conventions

### File & Folder
| Jenis | Convention | Contoh |
|-------|------------|--------|
| Komponen React | PascalCase | `ProductCard.tsx` |
| Halaman (page) | kebab-case | `transactions/page.tsx` |
| Hooks | camelCase + "use" prefix | `useCart.ts` |
| Utilities | camelCase | `formatCurrency.ts` |
| Tipe/Interface | PascalCase | `ProductType.ts` |
| Konstanta | UPPER_SNAKE_CASE | `MAX_QTY_PER_ITEM` |

### Variabel & Fungsi
```typescript
// ✅ Benar
const productStock = 10
const isOutOfStock = false
function getProductById(id: string) {}
const handleCheckout = () => {}

// ❌ Salah
const product_stock = 10
function GetProductById(id: string) {}
```

### Komponen React
```typescript
// ✅ Benar
interface ProductCardProps {
  name: string
  price: number
  stock: number
}

export function ProductCard({ name, price, stock }: ProductCardProps) {
  return (...)
}

// ❌ Salah — default export anonim, props tidak tipe
export default function({ name, price }) {
  return (...)
}
```

---

## 4. Aturan Coding

### TypeScript
- [ ] Selalu gunakan TypeScript, hindari `any`
- [ ] Definisikan interface/type untuk semua props & data (Product, CartItem, Transaction, TransactionItem)
- [ ] Aktifkan `strict: true` di `tsconfig.json`

### React
- [ ] Gunakan functional component
- [ ] Business logic (hitung total, validasi stok) dipisah dari komponen UI — taruh di `lib/` atau `hooks/`
- [ ] Gunakan `key` unik & stabil (id, bukan index) saat render list produk/keranjang

### Styling
- [ ] Ikuti warna & tipografi dari `StyleGuide.md`
- [ ] Gunakan CSS variable/Tailwind token, bukan hardcode hex
- [ ] Mobile-first

### API & Data
- [ ] Semua API call harus ada error handling
- [ ] Validasi input dengan Zod di setiap endpoint (products, checkout, transactions)
- [ ] **Total & harga HARUS dihitung ulang di server saat checkout** — jangan pernah percaya total dari body request frontend
- [ ] Harga produk disimpan sebagai snapshot (`priceAtPurchase`) di `TransactionItem`, tidak mengacu ke harga produk saat ini
- [ ] Pengurangan stok & pembuatan transaksi dibungkus dalam satu DB transaction (Prisma `$transaction`) agar konsisten
- [ ] Stok tidak boleh negatif — validasi ulang di server, bukan cuma di frontend
- [ ] Gunakan environment variable untuk semua secrets (`.env.local`), sediakan `.env.example` tanpa nilai asli

---

## 5. Git Convention

### Branch Naming
```
feature/[nama-fitur]     → fitur baru
fix/[nama-bug]           → perbaikan bug
chore/[nama-task]        → maintenance
docs/[nama-doc]          → dokumentasi
```

### Commit Message
Format: `[type]: [deskripsi singkat]`

```
feat: add product CRUD endpoints
feat: implement checkout with stock validation
fix: prevent negative stock on concurrent checkout
docs: add README installation steps
test: add checkout total calculation test
```

### Alur Kerja
Karena dikerjakan solo dan waktunya sangat singkat (deadline 29 Juli 2026, 23.59 WIB), commit langsung ke `main` diperbolehkan — **yang penting riwayat commit wajar** (bertahap per fitur, bukan satu commit besar di akhir).

---

## 6. Aturan untuk AI (Claude / Cursor / Copilot / OpenCode)

> Aturan ini wajib diikuti oleh AI yang membantu di proyek ini. Karena ini technical test, setiap bagian yang dibantu AI harus dicatat untuk dokumentasi submission (tools, bagian yang dibantu, cara divalidasi, perubahan yang dilakukan).

### ✅ AI HARUS:
- Ikuti struktur folder yang sudah didefinisikan di atas
- Gunakan tech stack yang sudah ditentukan (jangan ganti tanpa izin)
- Ikuti naming convention yang berlaku
- Tambahkan TypeScript types untuk semua kode baru
- Ikuti warna & komponen dari `StyleGuide.md`
- **Cek dokumentasi terkini via `context7` sebelum menulis kode yang bergantung pada API Next.js App Router, Prisma, atau library eksternal lain**
- **WAJIB gunakan `21st` MCP sebagai referensi/sumber komponen UI setiap kali membuat komponen baru** (kartu produk, form tambah/edit produk, tabel keranjang, modal checkout, list riwayat transaksi, dll) — ambil pattern/struktur dari `21st`, lalu **sesuaikan penuh** ke palet warna, tipografi, spacing, dan radius di `StyleGuide.md`. Jangan commit hasil `21st` mentah tanpa penyesuaian
- **Gunakan `supabase` tools untuk memverifikasi schema/data database sebenarnya** jika hosting DB pakai Supabase — jangan hanya andalkan file migration lokal
- **Gunakan `playwright` untuk verifikasi end-to-end** alur checkout dan pengurangan stok di browser sungguhan sebelum melaporkan fitur "selesai"
- Menjelaskan asumsi terhadap requirement secara eksplisit (akan masuk ke dokumentasi submission)

### ❌ AI DILARANG:
- Mengganti tech stack tanpa persetujuan
- Menggunakan library baru tanpa menyebutkannya dulu
- Membuat komponen UI dari nol tanpa referensi `21st` terlebih dahulu
- Menggunakan `any` di TypeScript
- Hardcode nilai yang seharusnya jadi environment variable
- Menghitung/memvalidasi total transaksi hanya di frontend
- Membuat komponen monolitik (satu file > 300 baris)
- Mengabaikan error handling

### ⚠️ AI harus TANYA dulu jika:
- Tidak yakin dengan keputusan arsitektur
- Ada konflik antara requirement di PRD dan aturan di sini
- Perlu install library baru
- Tidak yakin apakah sebuah kondisi termasuk edge case yang wajib ditangani

---

## 7. MCP Tools yang Tersedia

| Tool | Fungsi | Kapan Dipakai | Kapan TIDAK Dipakai |
|------|--------|----------------|----------------------|
| `context7` | Dokumentasi terkini library/framework | Sebelum kode yang pakai App Router, Prisma, atau syntax yang sering berubah | Logic bisnis murni tanpa dependency library |
| `21st` | Referensi/generate komponen UI | **Setiap kali** scaffold komponen UI baru untuk Mini POS — wajib, lalu sesuaikan ke `StyleGuide.md` | Kalau komponen serupa sudah ada di `src/components/ui/` — reuse dulu |
| `supabase` | Query & inspeksi database Supabase langsung | Verifikasi schema/data/migration state sebenarnya (jika pakai Supabase sebagai host DB) | Jika hal tersebut cukup dijawab dari file migration lokal |
| `playwright` | Kontrol browser untuk testing UI end-to-end | Verifikasi alur checkout & stok benar-benar berfungsi sebelum dilaporkan "selesai" | Perubahan kecil yang tidak menyentuh alur UI |

---

## 8. Checklist Sebelum Commit

- [ ] Kode sudah di-lint dan tidak ada error
- [ ] Tidak ada `console.log` yang tertinggal
- [ ] Semua fungsi/komponen baru sudah ada TypeScript types
- [ ] Sudah test manual di browser alur utama (tambah produk → checkout → cek riwayat)
- [ ] Tidak ada hardcoded string yang harusnya di `.env`
- [ ] Nama file & variabel mengikuti konvensi
- [ ] Tidak ada credential/secret ikut ter-commit

---

*RULES.md wajib dibaca sebelum mulai coding.*
