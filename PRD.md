# 📋 Product Requirements Document (PRD)

> **Proyek:** Mini POS — Xolvon Technical Test
> **Versi:** v1.0
> **Tanggal:** 27/07/2026
> **Author:** Noval Abdillah
> **Status:** 🟢 Final

---

## 1. Ringkasan Eksekutif

Mini POS adalah aplikasi web point-of-sale sederhana yang membantu kasir mengelola produk, keranjang, checkout, dan riwayat transaksi. Dibangun sebagai technical test recruitment Web Developer Xolvon Project Incubator Program, dengan fokus utama pada correctness, konsistensi data (stok & transaksi), dan kejelasan dokumentasi teknis — bukan jumlah fitur.

---

## 2. Latar Belakang & Masalah

### 2.1 Konteks
Ini adalah tugas evaluasi teknis: membangun aplikasi full-stack dari nol tanpa starter project, template, atau struktur database yang disediakan.

### 2.2 Pernyataan Masalah
Toko kecil butuh cara sederhana mencatat penjualan: menampilkan produk, membentuk keranjang, checkout dengan perhitungan yang benar, dan menyimpan riwayat transaksi — tanpa kompleksitas sistem POS enterprise.

### 2.3 Peluang
Menunjukkan kemampuan merancang sistem yang menjaga integritas data (stok tidak boleh negatif, harga snapshot per transaksi) sekaligus UX yang jelas untuk pengguna non-teknis.

---

## 3. Tujuan & Sasaran

| Tujuan | Metrik Keberhasilan | Target |
|--------|---------------------|--------|
| Ketepatan fitur & requirement | Semua 4 modul wajib berfungsi sesuai spesifikasi | 100% requirement wajib terpenuhi |
| Integritas data backend | Total & harga selalu dihitung/divalidasi di server | 0 kasus total dari frontend dipakai mentah |
| Stabilitas | Aplikasi tidak error saat alur normal dijalankan | Checkout & pengurangan stok konsisten |
| Dokumentasi jelas | Reviewer paham keputusan teknis tanpa presentasi | Dokumentasi submission lengkap sesuai checklist |

---

## 4. Target Pengguna

### 4.1 Persona Utama
- **Nama Persona:** "Sari, Kasir Toko Kelontong"
- **Usia:** 20–35 tahun
- **Profesi:** Staff kasir toko kecil
- **Pain Point:** Butuh mencatat penjualan cepat tanpa salah hitung stok/total
- **Goal:** Menyelesaikan transaksi dengan cepat dan akurat

### 4.2 Persona Sekunder
- **Nama Persona:** "Reviewer Xolvon (Tim Rekrutmen)"
- **Deskripsi:** Menilai kualitas kode, arsitektur, dan dokumentasi — bukan end-user harian

---

## 5. Ruang Lingkup

### ✅ In Scope (Yang Dikerjakan)
- [ ] Manajemen Produk: tampil, tambah, ubah, aktif/nonaktifkan (nama, harga, stok, status)
- [ ] Keranjang: tambah/hapus produk, ubah qty, subtotal & total, cegah qty melebihi stok
- [ ] Checkout: validasi produk & stok di server, hitung total di server, simpan transaksi + detail item, kurangi stok, cegah stok negatif, tampilkan ringkasan
- [ ] Riwayat Transaksi: daftar transaksi (waktu, total), detail per transaksi
- [ ] Validasi input & error handling di seluruh alur
- [ ] Loading state & empty state
- [ ] Minimal 3 automated test
- [ ] `.env.example`, README, deploy ke link publik

### ❌ Out of Scope (Yang TIDAK Dikerjakan)
- Autentikasi/login (tidak wajib menurut instruksi test; jika ditambahkan, sediakan akun demo)
- Multi-role user (admin/kasir terpisah)
- Cetak struk fisik/PDF
- Laporan analitik penjualan lanjutan
- Multi-cabang/multi-gudang

---

## 6. Fitur & Persyaratan Fungsional

### 6.1 Fitur: Manajemen Produk
- **Prioritas:** 🔴 Must Have
- **Deskripsi:** CRUD produk dengan atribut nama, harga, stok, status aktif/nonaktif.
- **User Story:**
  > Sebagai kasir/admin, saya ingin menambah dan mengubah data produk agar katalog selalu akurat.
- **Kriteria Penerimaan:**
  - [ ] Produk baru bisa ditambahkan dengan nama, harga, stok
  - [ ] Produk bisa diubah dan diaktifkan/dinonaktifkan
  - [ ] Produk nonaktif tidak muncul di daftar untuk checkout

### 6.2 Fitur: Keranjang
- **Prioritas:** 🔴 Must Have
- **Deskripsi:** Kasir memilih produk ke keranjang sebelum checkout.
- **User Story:**
  > Sebagai kasir, saya ingin menambah/menghapus/mengubah jumlah produk di keranjang agar transaksi sesuai kebutuhan pembeli.
- **Kriteria Penerimaan:**
  - [ ] Subtotal per item & total keranjang tampil otomatis
  - [ ] Jumlah tidak bisa melebihi stok yang tersedia

### 6.3 Fitur: Checkout
- **Prioritas:** 🔴 Must Have
- **Deskripsi:** Menyelesaikan transaksi dengan validasi penuh di backend.
- **User Story:**
  > Sebagai kasir, saya ingin checkout dengan aman agar stok dan total selalu akurat meski ada perubahan data bersamaan.
- **Kriteria Penerimaan:**
  - [ ] Produk & stok divalidasi ulang di server saat checkout
  - [ ] Total dihitung di server, bukan dari frontend
  - [ ] Harga per item disimpan sebagai snapshot di detail transaksi
  - [ ] Stok berkurang setelah transaksi berhasil dan tidak pernah negatif
  - [ ] Ringkasan transaksi ditampilkan setelah checkout berhasil

### 6.4 Fitur: Riwayat Transaksi
- **Prioritas:** 🔴 Must Have
- **Deskripsi:** Melihat kembali transaksi yang sudah terjadi.
- **User Story:**
  > Sebagai kasir/admin, saya ingin melihat riwayat transaksi agar bisa mengecek penjualan sebelumnya.
- **Kriteria Penerimaan:**
  - [ ] Daftar transaksi menampilkan waktu & total
  - [ ] Detail transaksi menampilkan item, qty, harga saat itu

---

## 7. Persyaratan Non-Fungsional

| Kategori | Persyaratan |
|----------|-------------|
| **Konsistensi Data** | Transaksi, detail transaksi, dan stok harus konsisten (gunakan DB transaction) |
| **Keamanan** | Tidak ada credential/secret di repository; environment variable untuk semua secret |
| **Validasi** | Semua input tervalidasi, ada error handling yang jelas |
| **Kompatibilitas** | Berjalan baik di browser modern (Chrome, Firefox, Safari terbaru) |
| **Testing** | Minimal 3 automated test untuk bagian penting (checkout, stok, total) |

---

## 8. Desain & UX

- **Referensi Desain:** Tidak ada Figma — desain ditentukan lewat `StyleGuide.md`, komponen UI baru direferensikan lewat MCP `21st` lalu disesuaikan ke style guide
- **Style Guide:** Lihat `StyleGuide.md`
- **Prinsip UX:** Sederhana, cepat dipahami kasir non-teknis; prioritas kejelasan status stok & total di setiap langkah

---

## 9. Dependensi & Integrasi

| Sistem/Layanan | Tujuan | Tim Penanggung Jawab |
|----------------|--------|----------------------|
| PostgreSQL (hosted) | Penyimpanan produk & transaksi | Individu (Noval) |
| Vercel | Deployment aplikasi | Individu (Noval) |

---

## 10. Timeline & Milestone

| Milestone | Target Tanggal | Status |
|-----------|----------------|--------|
| Setup project & schema DB | 27/07/2026 | ⬜ Belum Mulai |
| Manajemen Produk + Keranjang | 27–28/07/2026 | ⬜ Belum Mulai |
| Checkout + Riwayat Transaksi | 28/07/2026 | ⬜ Belum Mulai |
| Testing + README + Docs | 29/07/2026 (pagi–siang) | ⬜ Belum Mulai |
| Deploy + Submission | 29/07/2026, sebelum 23.59 WIB | ⬜ Belum Mulai |

---

## 11. Risiko & Mitigasi

| Risiko | Dampak | Kemungkinan | Mitigasi |
|--------|--------|-------------|----------|
| Waktu pengerjaan sangat mepet (deadline hari ini) | Tinggi | Tinggi | Prioritaskan 4 fitur wajib dulu, fitur tambahan ditunda |
| Race condition stok saat checkout | Tinggi | Sedang | Gunakan DB transaction/lock saat kurangi stok |
| Lupa dokumentasi penggunaan AI | Sedang | Sedang | Catat sejak awal setiap sesi AI dipakai |

---

## 12. Pertanyaan Terbuka (Open Questions)

- [ ] Apakah perlu autentikasi sederhana atau full open access untuk versi ini?
- [ ] Hosting Postgres pakai Supabase, Neon, atau Railway?

---

## 13. Riwayat Perubahan

| Versi | Tanggal | Perubahan | Author |
|-------|---------|-----------|--------|
| v1.0 | 27/07/2026 | Dokumen awal dibuat berdasarkan instruksi technical test | Noval Abdillah |
