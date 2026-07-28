# ✅ Task Board

> **Proyek:** Mini POS — Xolvon Technical Test
> **Sprint/Fase:** Sprint 1 — Full Build (satu-satunya sprint, deadline ketat)
> **Periode:** 27/07/2026 – 29/07/2026 (23.59 WIB)
> **Update Terakhir:** 27/07/2026

---

## 📊 Ringkasan Sprint

| Total Task | 🔴 Belum Mulai | 🟡 Sedang Dikerjakan | 🟢 Selesai | 🚫 Diblokir |
|-----------|----------------|----------------------|-----------|-------------|
| 9 | 9 | 0 | 0 | 0 |

---

## 🔴 Belum Mulai (To Do)

### [TASK-001] Setup Project & Schema Database
- **Prioritas:** 🔴 High
- **Assignee:** @noval
- **Estimasi:** 1–2 jam
- **Deadline:** 27/07/2026
- **Label:** `backend` `devops`
- **Deskripsi:** Init Next.js + TypeScript + Tailwind, setup Prisma, buat schema Product, Transaction, TransactionItem, migrate ke DB.
- **Acceptance Criteria:**
  - [ ] Project bisa dijalankan lokal
  - [ ] Schema Prisma ter-migrate ke database
  - [ ] `.env.example` tersedia

---

### [TASK-002] Manajemen Produk (CRUD)
- **Prioritas:** 🔴 High
- **Assignee:** @noval
- **Estimasi:** 3–4 jam
- **Deadline:** 27–28/07/2026
- **Label:** `frontend` `backend`
- **Deskripsi:** Halaman & API untuk tampil, tambah, ubah produk, serta aktif/nonaktifkan.
- **Acceptance Criteria:**
  - [ ] List produk tampil dengan status stok
  - [ ] Tambah & edit produk tervalidasi (nama, harga, stok wajib)
  - [ ] Toggle aktif/nonaktif berfungsi

---

### [TASK-003] Keranjang
- **Prioritas:** 🔴 High
- **Assignee:** @noval
- **Estimasi:** 2–3 jam
- **Deadline:** 28/07/2026
- **Label:** `frontend`
- **Deskripsi:** Tambah/hapus produk ke keranjang, ubah qty, hitung subtotal & total di frontend (ditampilkan), tapi tetap divalidasi ulang di server saat checkout.
- **Acceptance Criteria:**
  - [ ] Qty tidak bisa melebihi stok tersedia
  - [ ] Subtotal & total ter-update otomatis

---

### [TASK-004] Checkout (Server-side Validation)
- **Prioritas:** 🔴 High
- **Assignee:** @noval
- **Estimasi:** 3–4 jam
- **Deadline:** 28/07/2026
- **Label:** `backend`
- **Deskripsi:** Endpoint checkout yang memvalidasi stok & produk, menghitung total di server, menyimpan transaksi + detail (dengan snapshot harga), mengurangi stok dalam satu DB transaction.
- **Acceptance Criteria:**
  - [ ] Total dihitung ulang di server, tidak percaya body request
  - [ ] Harga tersimpan sebagai snapshot per item
  - [ ] Stok tidak pernah menjadi negatif
  - [ ] Ringkasan transaksi ditampilkan setelah sukses

---

### [TASK-005] Riwayat Transaksi
- **Prioritas:** 🔴 High
- **Assignee:** @noval
- **Estimasi:** 1–2 jam
- **Deadline:** 28/07/2026
- **Label:** `frontend` `backend`
- **Deskripsi:** Halaman daftar transaksi + detail per transaksi.
- **Acceptance Criteria:**
  - [ ] List transaksi menampilkan waktu & total
  - [ ] Klik transaksi menampilkan detail item

---

### [TASK-006] Automated Tests (Minimal 3)
- **Prioritas:** 🔴 High
- **Assignee:** @noval
- **Estimasi:** 1–2 jam
- **Deadline:** 29/07/2026 (pagi)
- **Label:** `testing`
- **Deskripsi:** Test untuk logic penting: perhitungan total checkout, validasi stok tidak boleh negatif, validasi qty tidak melebihi stok.
- **Acceptance Criteria:**
  - [ ] Minimal 3 test berjalan dan lulus

---

### [TASK-007] README & .env.example
- **Prioritas:** 🟡 Medium
- **Assignee:** @noval
- **Estimasi:** 1 jam
- **Deadline:** 29/07/2026 (siang)
- **Label:** `documentation`
- **Deskripsi:** Ringkasan project, tech stack, cara instalasi, setup DB & env var, cara run test, link deployment.

---

### [TASK-008] Dokumentasi Submission (PDF)
- **Prioritas:** 🔴 High
- **Assignee:** @noval
- **Estimasi:** 1–2 jam
- **Deadline:** 29/07/2026 (siang–sore)
- **Label:** `documentation`
- **Deskripsi:** Gambaran aplikasi, arsitektur, tech stack, fitur selesai/belum, keputusan teknis & trade-off, testing, asumsi requirement, penggunaan AI, keterbatasan & rencana pengembangan.

---

### [TASK-009] Deploy & Submit
- **Prioritas:** 🔴 High
- **Assignee:** @noval
- **Estimasi:** 1 jam
- **Deadline:** 29/07/2026, sebelum 23.59 WIB
- **Label:** `devops`
- **Deskripsi:** Deploy ke Vercel + DB hosting, cek link publik bisa diakses, submit repo GitHub + link deploy + README + dokumentasi via Google Form.

---

## 🟡 Sedang Dikerjakan (In Progress)

*(kosong — belum mulai)*

---

## 🟢 Selesai (Done)

*(kosong)*

---

## 🚫 Diblokir (Blocked)

*(kosong)*

---

## 🗑️ Backlog (Fitur Tambahan — hanya jika waktu tersisa)

| ID | Judul Task | Prioritas | Estimasi | Catatan |
|----|------------|-----------|----------|---------|
| TASK-010 | Search/filter produk | 🟢 Low | 1 jam | Tidak wajib |
| TASK-011 | Export riwayat transaksi ke CSV | 🟢 Low | 1 jam | Tidak wajib |
| TASK-012 | Dark mode | 🟢 Low | 1 jam | Tidak prioritas |

> ⚠️ Fitur tambahan hanya dikerjakan **setelah** TASK-001 s.d. TASK-009 selesai.

---

## 👥 Pembagian Tugas

| Nama | Role | Kapasitas |
|------|------|-----------|
| @noval | Fullstack Dev (solo) | 100% — dikerjakan individu sesuai ketentuan test |

---

*Task board ini diupdate manual setiap progress berubah — checklist di atas jadi acuan urutan kerja sampai deadline 29 Juli 2026, 23.59 WIB.*
