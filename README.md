# SebelumTugasMandiri - Website JasaOprek (P04-02)

Folder ini berisi salinan lengkap source code proyek **P04 (Form HTML dan Accessibility)** pada tahap penyelesaian **Praktikum Terbimbing (P04-02)**, yaitu kondisi **sebelum** penambahan fitur pada **Tugas Mandiri (P04-04)**.

---

## Ringkasan Perbedaan dengan Versi Utama (Setelah Tugas Mandiri)

| Komponen / Fitur | Versi Sebelum Tugas Mandiri (`SebelumTugasMandiri`) | Versi Utama P04 (Setelah Tugas Mandiri) |
|---|---|---|
| **Field WhatsApp / Telepon** | *Belum ada* | Ada (`<input type="tel" id="telepon" name="telepon">`) |
| **Grup Preferensi Waktu Kontak** | *Belum ada* | Ada (`<fieldset>` pilihan radio pagi, siang, malam) |
| **Output Preview (`js/form.js`)** | Menampilkan 5 data: Nama, Email, Paket, Topik, Pesan | Menampilkan 7 data: + WhatsApp dan Waktu Dihubungi |
| **Kontrol Form Lainnya** | Lengkap (Nama, Email, Dropdown Paket Servis, Radio Topik, Textarea Pesan) | Lengkap |
| **Aksesibilitas & Semantik** | Landmark semantik, label-for eksplisit, focus order teruji | Landmark semantik, label-for eksplisit, focus order teruji |

---

## Struktur Berkas
- `index.html` — Halaman Beranda (sudah memiliki link Kontak di navigasi)
- `tentang.html` — Halaman Profil & Teknisi
- `produk.html` — Katalog Layanan & Daftar Tarif Servis
- `galeri.html` — Dokumentasi Meja Kerja & Audio
- `kontak.html` — Form Kontak dasar sesuai langkah praktikum terbimbing 1–8
- `css/style.css` — Penataan gaya form, preview, dan tema JasaOprek
- `js/form.js` — Handler penyerahan formulir dan pembaruan teks pratinjau (Langkah 9)
- `js/script.js` — Logika promo dan script P03
- `assets/` — Gambar dan berkas audio pendukung
