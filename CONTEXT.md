# 🧠 Project Context

> File ini adalah **briefing singkat** untuk AI sebelum membaca dokumen lainnya.

---

## Apa Proyek Ini?

**Nama:** Mini POS — Xolvon Technical Test
**Tagline:** Aplikasi Point of Sale sederhana untuk mengelola produk, keranjang, checkout, dan riwayat transaksi dengan integritas data yang dijaga di backend.

---

## Masalah yang Diselesaikan

Ini adalah technical test recruitment Web Developer untuk Xolvon Project Incubator Program. Tujuannya menilai kemampuan membangun aplikasi full-stack dari nol: memahami requirement, merancang sistem, mengembangkan frontend & backend, mengelola database, menjaga kualitas kode, dan mendokumentasikan keputusan teknis.

---

## Solusi yang Dibangun

Aplikasi web Mini POS yang mencakup 4 modul inti: manajemen produk (CRUD + aktif/nonaktif), keranjang (tambah/hapus/ubah qty dengan validasi stok), checkout (validasi & hitung total di server, simpan transaksi + detail, kurangi stok), dan riwayat transaksi (list + detail). Semua perhitungan harga/total **wajib divalidasi di backend**, bukan hanya dari data frontend.

---

## Target Pengguna

- **Siapa:** Kasir/staff toko kecil yang menjalankan transaksi harian
- **Keahlian teknis:** Pemula
- **Platform utama:** Web (desktop kasir, tapi harus tetap responsif)
- **Konteks penggunaan:** Dipakai langsung saat melayani transaksi di kasir — harus cepat dan jelas

---

## Tech Stack Singkat

```
Frontend  : Next.js 14 (App Router) + TypeScript
Styling   : Tailwind CSS
Backend   : Next.js API Routes
Database  : PostgreSQL
ORM       : Prisma
Auth      : Tidak wajib — di luar scope wajib untuk versi ini
Deploy    : Vercel (app) + Neon/Supabase/Railway (Postgres)
```

> Detail lengkap ada di `RULES.md`

---

## Status Proyek Saat Ini

- **Fase:** Development
- **Sprint aktif:** Sprint 1 — Build seluruh core requirement (Mini POS)
- **Yang sudah ada:** Belum ada kode, mulai dari nol (tidak boleh pakai starter/template POS jadi)
- **Target launch:** 29 Juli 2026, pukul 23.59 WIB (batas pengumpulan technical test)

---

## 🔌 MCP Tools yang Tersedia

> AI harus memanfaatkan tools ini secara otomatis tanpa perlu diminta setiap kali — lihat `RULES.md` bagian 6 untuk aturan lengkapnya.

| Tool | Fungsi | Kapan Dipakai |
|------|--------|----------------|
| `context7` | Ambil dokumentasi terkini library/framework | Sebelum menulis kode Next.js App Router, Prisma, atau library eksternal lain yang syntax-nya sering berubah |
| `21st` | Cari/generate komponen UI referensi | **Wajib dipakai** saat butuh scaffold komponen UI baru untuk Mini POS (kartu produk, form, tabel keranjang, modal checkout, dll) — hasilnya tetap disesuaikan ke `StyleGuide.md`, jangan tempel mentah |
| `supabase` | Akses langsung ke database Supabase (schema, query, migration status) | Kalau DB hosting yang dipakai Supabase — verifikasi schema/data asli, bukan cuma baca file migration lokal |
| `playwright` | Kontrol browser sungguhan untuk testing alur UI | Verifikasi end-to-end sebelum klaim fitur "selesai" — terutama alur checkout & pengurangan stok |

---

## Hal Penting yang Harus AI Ketahui

- Bahasa antarmuka: **Indonesia**.
- Harga & total transaksi **wajib dihitung/divalidasi di backend**, tidak boleh percaya data dari frontend begitu saja.
- Harga produk saat transaksi harus **disimpan sebagai snapshot** di detail transaksi (perubahan harga produk nanti tidak boleh mengubah transaksi lama).
- Stok tidak boleh negatif; checkout harus mencegah pembelian melebihi stok.
- Tidak ada starter project/template POS — semua dibangun dari awal selama periode 27–29 Juli 2026.
- Deadline keras: **29 Juli 2026, 23.59 WIB**. Prioritaskan aplikasi sederhana yang stabil daripada banyak fitur tapi tidak jalan.
- Minimal 3 automated test untuk bagian penting aplikasi (disarankan: logic checkout, validasi stok, hitung total).
- Setiap penggunaan AI dalam pengerjaan harus dicatat (tools, bagian yang dibantu, cara validasi, perubahan yang dilakukan) — untuk dokumentasi submission.

---

## Dokumen Referensi

| Dokumen | Isi |
|---------|-----|
| `PRD.md` | Goals, fitur, user stories, kriteria penerimaan |
| `StyleGuide.md` | Warna, tipografi, komponen UI |
| `Tasks.md` | Task board, urutan pengerjaan |
| `RULES.md` | Konvensi koding, struktur folder, aturan AI |

---

*Baca file ini dulu sebelum file lainnya.*
