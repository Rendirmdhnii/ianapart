# Ian Apartement - Katalog Sewa Properti

## Deskripsi Proyek
Ian Apartement adalah platform aplikasi web berbasis katalog yang dirancang untuk memfasilitasi penyewaan apartemen harian dan bulanan di wilayah Sidoarjo dan Surabaya. Proyek ini difokuskan pada antarmuka pengguna yang bersih, modern, dan fungsional. Sistem ini beroperasi sebagai etalase digital statis yang mengutamakan kecepatan dan kemudahan akses, dengan seluruh alur pemesanan diarahkan secara langsung kepada administrator melalui integrasi tautan WhatsApp dinamis.

## Fitur Utama
* **Antarmuka Responsif:** Tata letak yang beradaptasi secara dinamis untuk memberikan pengalaman penelusuran yang optimal di perangkat seluler, tablet, maupun desktop.
* **Katalog Properti Visual:** Menampilkan daftar unit apartemen yang dilengkapi dengan detail lokasi, harga sewa, dan visual berkualitas tinggi.
* **Sistem Pemesanan Langsung:** Setiap kartu properti terhubung dengan sistem pembentukan pesan WhatsApp secara otomatis (pre-filled text) berdasarkan unit yang dipilih oleh pengguna.
* **Manajemen Aset Lokal:** Seluruh aset gambar dikelola secara terpusat di dalam direktori publik untuk memastikan keandalan pemuatan media.

## Teknologi yang Digunakan
* **Framework Frontend:** React (direkomendasikan menggunakan Vite)
* **Styling:** Tailwind CSS

## Persyaratan Sistem
* Node.js (Versi 16 atau yang lebih baru)
* Manajer paket NPM atau Yarn

## Panduan Instalasi dan Konfigurasi
Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan pengembangan lokal:

1.  **Kloning Repositori:**
    ```bash
    git clone [https://github.com/Rendirmdhnii/ianapart.git](https://github.com/Rendirmdhnii/ianapart.git)
    cd ianapart
    ```

2.  **Instalasi Dependensi:**
    Jalankan perintah berikut untuk mengunduh semua pustaka yang dibutuhkan:
    ```bash
    npm install
    ```

3.  **Manajemen Aset:**
    Pastikan semua file gambar apartemen (seperti `Prospero.webp`, `Suncity 2br.jpg`, `Papilio.jpg`, dll.) telah ditempatkan dengan benar di dalam direktori `public/images/` agar dapat dirender oleh sistem.

4.  **Menjalankan Server Pengembangan:**
    ```bash
    npm run dev
    ```

5.  **Akses Aplikasi:**
    Buka peramban web Anda dan akses alamat lokal yang disediakan pada terminal (umumnya `http://localhost:5173`).

## Panduan Modifikasi Data
Data properti dirender menggunakan format array JSON di dalam kode komponen utama. Untuk memperbarui daftar apartemen, modifikasi data pada array tersebut dengan memastikan struktur properti berikut tetap terjaga: `id`, `nama`, `lokasi`, `harga`, dan jalur absolut direktori lokal pada `image_url`.

## Pengembang
Dikembangkan oleh Muhammad Rendy Ramadhani.
