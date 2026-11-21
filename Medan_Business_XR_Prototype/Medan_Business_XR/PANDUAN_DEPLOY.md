# Cara mendapatkan tautan publik GitHub Pages

**Belum dipublikasikan.** Ini adalah paket situs siap-unggah, bukan tautan publik yang sudah aktif.

1. Masuk ke GitHub dan buat repository publik baru, misalnya `medan-business-xr`.
2. Unggah **isi folder proyek** ke *root* repository (jangan hanya unggah file `.zip`): `index.html`, `styles.css`, `app.js`, `app3d.js`, dan folder `assets` yang berisi `.glb` dan `.png`.
3. Buka repository > **Settings** > **Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**, `main` dan `/ (root)`; klik **Save**.
5. Setelah penerbitan berhasil, buka alamat yang ditampilkan GitHub Pages, biasanya `https://USERNAME.github.io/medan-business-xr/` — **ini pola contoh, bukan alamat yang sudah dibuat**.
6. Uji fungsi role-play, model 3D, tombol AR pada ponsel yang kompatibel, dan tombol VR pada perangkat WebXR. Teknologi AR/VR native membutuhkan HTTPS.
7. Salin URL publik yang benar-benar muncul setelah deploy dan cantumkan pada laporan PDF untuk dikumpulkan melalui LMS.

**Alternatif mudah:** Netlify Drop / layanan static hosting lain yang menerima berkas folder dan menyediakan HTTPS.

## Hal penting
- Butuh internet agar pustaka 3D dari CDN dapat dimuat.
- Jika tampilan 3D tidak muncul, pastikan browser mengizinkan WebGL, CDN tidak diblokir, dan berkas lengkap.
- Jika tombol AR tidak muncul, perangkat/OS/browser kemungkinan belum mendukung mode AR native; tetap gunakan pratinjau 3D.
- Untuk umpan balik GenAI, gunakan *Copy ChatGPT prompt* dan masukkan hasilnya, atau pakai API khusus uji coba. Hindari membagikan API key di GitHub.
- Di laporan PDF, kolom URL publik harus diisi **setelah** link berhasil terbit.
