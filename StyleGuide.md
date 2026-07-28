# 🎨 Style Guide

> **Proyek:** Mini POS — Xolvon Technical Test
> **Versi:** v1.1 (Redesigned with Claude-like aesthetics)
> **Tanggal:** 28/07/2026
> **Dibuat oleh:** Noval Abdillah

---

## 1. Brand Identity

### 1.1 Misi & Nilai Brand
- **Misi:** Membantu kasir menyelesaikan transaksi secepat dan seakurat mungkin.
- **Visi:** Antarmuka POS yang modern, bersih, minimalis, dan minim gesekan.
- **Nilai-nilai:** Flat design, kejelasan hierarki, border tipis, kenyamanan whitespace.

---

## 2. Palet Warna

### 2.1 Warna Utama (Primary)

| Nama | HEX | Penggunaan |
|------|-----|------------|
| Primary | `#2563EB` | Aksen biru utama, CTA (checkout, simpan), link utama |
| Primary Dark | `#1D4ED8` | Hover state |
| Primary Light | `#F3F4F6` | Background aksen soft |

### 2.2 Warna Sekunder & Netral

| Nama | HEX | Penggunaan |
|------|-----|------------|
| Black | `#111827` | Teks utama pekat |
| Dark Gray | `#4B5563` | Teks sekunder/deskripsi |
| Light Gray | `#E5E7EB` | Border tipis 1px |
| Off White | `#F9FAFB` | Background utama halaman flat |
| White | `#FFFFFF` | Background panel, card, modal |

### 2.3 Warna Status / Semantik

| Status | HEX | Penggunaan |
|--------|-----|------------|
| ✅ Success | bg-green-50, text-#22C55E | Transaksi sukses |
| ⚠️ Warning | bg-amber-50, text-#F59E0B | Stok menipis |
| ❌ Error | bg-red-50, text-#EF4444 | Stok habis, error |

---

## 3. Tipografi & Spacing

### 3.1 Tipografi
- **Heading**: Inter (bold, tracking-tight, pekat).
- **Body**: Inter.
- **Hierarki**:
  - H1: 24px (font-bold)
  - H2/Section: 18px (font-bold)
  - Body: 14px (font-medium)
  - Subtext/Caption: 12px

### 3.2 Spacing
- Container padding: `p-8` (px-8 py-8) untuk whitespace lega.
- Grid gap: `gap-6` atau `gap-8` agar elemen "bernapas".

### 3.3 Border Radius
- Card & Panel: `rounded-xl` (12px)
- Button & Input: `rounded-lg` (8px-10px)
- Badge: `rounded-sm` atau `rounded-full`

---

## 4. Komponen UI Final

### 4.1 Card Produk
Flat style, border 1px `#E5E7EB`, padding `p-5`, shadow-sm (sangat halus), hover border `#9CA3AF` dengan transisi halus.

### 4.2 Sidebar Keranjang
Border-left tipis `border-[#E5E7EB]` tanpa shadow besar, background putih flat.
