# 🎨 Style Guide

> **Proyek:** Mini POS — Xolvon Technical Test
> **Versi:** v1.0
> **Tanggal:** 27/07/2026
> **Dibuat oleh:** Noval Abdillah

---

## 1. Brand Identity

### 1.1 Misi & Nilai Brand
- **Misi:** Membantu kasir menyelesaikan transaksi secepat dan seakurat mungkin
- **Visi:** Antarmuka POS yang minim gesekan — tidak butuh training
- **Nilai-nilai:** Jelas, Cepat, Akurat

### 1.2 Tone of Voice
| Kami adalah... | Kami BUKAN... |
|----------------|---------------|
| Jelas & langsung | Berbelit-belit |
| Fungsional | Dekoratif berlebihan |
| Informatif (status stok, error jelas) | Membingungkan |
| Tenang, percaya diri | Ramai/berisik secara visual |

---

## 2. Palet Warna

### 2.1 Warna Utama (Primary)

| Nama | HEX | Penggunaan |
|------|-----|------------|
| Primary | `#2563EB` | CTA button (checkout, simpan), link utama |
| Primary Dark | `#1D4ED8` | Hover state |
| Primary Light | `#DBEAFE` | Background aksen, badge info |

### 2.2 Warna Sekunder (Secondary)

| Nama | HEX | Penggunaan |
|------|-----|------------|
| Secondary | `#0EA5E9` | Elemen pendukung, ikon |
| Secondary Dark | `#0284C7` | Hover secondary |

### 2.3 Warna Netral

| Nama | HEX | Penggunaan |
|------|-----|------------|
| Black | `#111827` | Teks utama |
| Dark Gray | `#4B5563` | Teks sekunder |
| Medium Gray | `#9CA3AF` | Placeholder, disabled |
| Light Gray | `#E5E7EB` | Border, divider |
| Off White | `#F9FAFB` | Background section |
| White | `#FFFFFF` | Background utama (card, form) |

### 2.4 Warna Status / Semantik

| Status | HEX | Penggunaan |
|--------|-----|------------|
| ✅ Success | `#22C55E` | Transaksi berhasil |
| ⚠️ Warning | `#F59E0B` | Stok menipis |
| ❌ Error | `#EF4444` | Stok habis, validasi gagal |
| ℹ️ Info | `#3B82F6` | Info umum, status nonaktif |

---

## 3. Tipografi

### 3.1 Font Family

| Peran | Font | Alternatif |
|-------|------|------------|
| **Heading** | Inter | system-ui, sans-serif |
| **Body** | Inter | system-ui, sans-serif |
| **Code/Mono** | JetBrains Mono | Courier New, monospace |

> Import dari Google Fonts: Inter

### 3.2 Skala Tipografi

| Nama | Size | Weight | Penggunaan |
|------|------|--------|------------|
| H1 | 28px | 700 | Judul halaman (Produk, Riwayat Transaksi) |
| H2 | 22px | 600 | Judul section (Keranjang, Ringkasan) |
| H3 | 18px | 600 | Card title (nama produk) |
| Body | 16px | 400 | Teks utama |
| Body Small | 14px | 400 | Label, caption, harga di kartu |
| Caption | 12px | 400 | Metadata, timestamp transaksi |

---

## 4. Spacing & Layout

### 4.1 Sistem Spacing (Base: 4px)

| Token | Nilai | Penggunaan |
|-------|-------|------------|
| `space-1` | 4px | Micro spacing |
| `space-2` | 8px | Inner padding kecil |
| `space-3` | 12px | Gap antar elemen kecil |
| `space-4` | 16px | Padding standar card/form |
| `space-5` | 24px | Section padding |
| `space-6` | 32px | Jarak antar komponen besar |

### 4.2 Grid & Breakpoints

| Breakpoint | Lebar | Penggunaan |
|------------|-------|------------|
| Mobile | < 768px | List produk 1 kolom, keranjang jadi bottom sheet |
| Tablet | 768px–1024px | 2 kolom |
| Desktop | > 1024px | Layout 2 panel: daftar produk kiri, keranjang kanan (khas POS) |

**Max Content Width:** `1280px`

### 4.3 Border Radius

| Token | Nilai | Penggunaan |
|-------|-------|------------|
| `radius-sm` | 4px | Badge status (aktif/nonaktif) |
| `radius-md` | 8px | Card produk, input field |
| `radius-lg` | 12px | Modal checkout, panel keranjang |
| `radius-full` | 9999px | Tombol qty (+/-), avatar |

---

## 5. Komponen UI

> 🔌 **Catatan untuk AI:** Setiap kali butuh scaffold komponen baru yang belum ada di `src/components/ui/`, **wajib** cari referensi dulu lewat MCP `21st`, lalu sesuaikan hasilnya ke token warna, tipografi, spacing, dan radius di atas sebelum dipakai. Jangan commit komponen dengan warna/ukuran hardcode dari hasil `21st` mentah-mentah.

### 5.1 Button

| Varian | Penggunaan | Style |
|--------|------------|-------|
| **Primary** | Checkout, Simpan Produk | Background: Primary |
| **Secondary** | Batal, Edit | Border Primary, transparent bg |
| **Ghost** | Aksi minor (hapus item kecil) | No border, subtle hover |
| **Danger** | Hapus produk/item | Background: Error |
| **Disabled** | Checkout saat keranjang kosong/stok habis | Opacity 40%, cursor not-allowed |

**Ukuran Button:**
- Medium (default): `height: 40px`, `padding: 0 16px`, `font-size: 16px`
- Large (tombol checkout utama): `height: 48px`, `padding: 0 24px`, `font-size: 18px`

### 5.2 Form Elements

- **Input Height:** 40px
- **Border:** 1px solid `#E5E7EB`
- **Focus Border:** 2px solid Primary
- **Error Border:** 1px solid Error, tampilkan pesan error di bawah input

### 5.3 Card Produk

```
padding: 16px
border-radius: 8px
box-shadow: 0 1px 3px rgba(0,0,0,0.08)
border: 1px solid #E5E7EB
background: #FFFFFF
```
Tampilkan: nama produk, harga, badge stok (warna Warning jika stok < 5, Error jika 0), tombol tambah ke keranjang (disabled jika stok 0 atau produk nonaktif).

### 5.4 Badge Status Stok
- Stok aman: teks abu-abu biasa
- Stok < 5: badge kuning "Stok menipis"
- Stok 0: badge merah "Habis", tombol tambah disabled

---

## 6. Ikonografi

- **Library:** Lucide
- **Ukuran Standar:** 16px (kecil, inline), 20px (standar, tombol), 24px (besar, header)
- **Style:** Outline
- **Warna:** Mengikuti warna teks atau Primary untuk ikon aktif

---

## 7. Imagery & Ilustrasi

- Produk tanpa foto: gunakan placeholder ikon kategori sederhana, bukan foto stok generik
- Format: SVG untuk ikon/ilustrasi

---

## 8. Animasi & Transisi

| Jenis | Durasi | Easing | Penggunaan |
|-------|--------|--------|------------|
| Micro-interaction | 100–150ms | ease-out | Tombol hover, toggle status produk |
| Transition | 200–300ms | ease-in-out | Modal checkout, dropdown |
| Loading | Loop | linear | Spinner saat submit checkout |

---

## 9. Aksesibilitas

- **Kontras Warna:** Minimum 4.5:1 untuk teks normal
- **Focus State:** Semua elemen interaktif (tombol qty, checkout) harus punya visible focus ring
- **Ukuran Tap Target:** Minimum 44x44px, penting untuk tombol qty dan checkout di mobile

---

## 10. ✅ Do's & ❌ Don'ts

### ✅ Lakukan
- Selalu tampilkan status stok dengan jelas di setiap kartu produk
- Beri feedback visual segera setelah checkout berhasil/gagal
- Jaga hierarki: harga & tombol aksi harus paling menonjol di kartu produk

### ❌ Jangan
- Jangan biarkan tombol checkout aktif kalau keranjang kosong atau ada item melebihi stok
- Jangan gunakan warna Error untuk hal selain error/stok habis
- Jangan tambahkan animasi berlebihan yang memperlambat alur kasir

---

*Style Guide ini adalah dokumen hidup — perbarui jika ada perubahan arah desain.*
