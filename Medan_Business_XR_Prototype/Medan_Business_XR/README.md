# MEDAN BUSINESS XR — Business English Interactive Learning

**Mini Project Individu | AR, VR & Generative AI untuk Business English**

Prototipe web statis untuk melatih **professional greeting, clarifying requirements, fair negotiation, dan written follow-up** dengan studi kasus fiktif pertemuan koperasi kopi Sumatera Utara dan pembeli internasional.

## Berkas
- `index.html`: aplikasi dan antarmuka.
- `styles.css`: desain responsif.
- `app.js`: 4 tahap role-play, evaluasi formatif, TTS, GenAI opsional, ekspor hasil.
- `app3d.js`: showroom 3D dengan Three.js dan tombol VR WebXR (perangkat kompatibel).
- `assets/toba_coffee.glb`: model kemasan kopi 3D asli yang dapat diputar dan dibuka pada mode AR yang mendukung.
- `assets/toba_coffee_label.png`: tekstur produk fiktif.

## Cara menjalankan
1. **Paling mudah:** unggah seluruh isi folder ke GitHub Pages (panduan di `PANDUAN_DEPLOY.md`). Situs memerlukan HTTPS untuk VR/AR native.
2. **Uji lokal:** jalankan `python -m http.server 8000` dari dalam folder dan buka `http://localhost:8000`.
3. Buka **Ruang bisnis 3D** untuk eksplorasi ruang dan hotspot.
4. Buka **Produk dalam AR**: putar model GLB; pada ponsel/perangkat kompatibel tersedia tombol untuk menempatkan objek di ruang nyata.
5. Buka **Role-play & GenAI**: jawablah 4 tahap, tuliskan respons sendiri, coba pemeriksaan offline / GenAI, dan buka **Hasil latihan**.

## Memahami fitur teknologinya
- **VR:** ruang rapat WebGL 3D; tombol headset VR berbasis WebXR apabila browser, headset, serta HTTPS mendukung. Pengalaman 3D biasa tetap dapat digunakan tanpa headset.
- **AR:** model kemasan GLB dengan `<model-viewer>` pada Android (Scene Viewer/WebXR) atau Safari iOS (Quick Look) *jika didukung*. Pada komputer, pengguna dapat memutar objek 3D sebagai fallback. Tidak semua ponsel mendukung AR asli.
- **GenAI:** umpan balik model Gemini opsional (perlu API key sendiri), atau salin prompt ke ChatGPT dan tempel respons AI. **Check offline adalah rule-based**, bukan GenAI.
- **Kearifan lokal:** konteks produk kopi Sumatera Utara, visual geometris, dan keputusan negosiasi yang menekankan saling menghormati serta musyawarah untuk mencapai solusi. Tidak mengklaim keaslian motif tradisional.

## Keamanan & keterbatasan
- Aplikasi demonstrasi ini **tidak menyimpan API key** pada Local Storage atau berkas. Namun, saat memakai koneksi Gemini langsung, key dikirim dari browser ke API dan **tidak aman untuk aplikasi produksi**. Cara lebih aman: gunakan fitur *Copy ChatGPT prompt*, atau buat backend proxy yang mengelola kunci secara rahasia.
- Hindari memasukkan data pribadi/rahasia dalam latihan AI. Semua entitas, penawaran, kapasitas produksi, dan produk pada skenario ini adalah **fiktif**.
- Memerlukan akses internet untuk memuat pustaka Three.js dan model-viewer dari CDN serta layanan GenAI. Mode dasar latihan dan perspektif visual cadangan tetap tersedia tanpa pustaka eksternal.
- File GLB, label, kode, dan teks latihan disiapkan secara khusus untuk mini project. Pemakaian library eksternal mengikuti lisensi masing-masing penyedia.
- Skor **formatif internal**: pilihan terbaik bernilai 25 poin, alternatif tidak terbaik 8 poin, belum dikerjakan 0; maksimum 100. Bukan nilai akhir mata kuliah.

## Capaian pembelajaran
1. Menyampaikan pembukaan pertemuan bisnis dan tujuan komunikasi.
2. Menanyakan klarifikasi sebelum membuat komitmen.
3. Mengusulkan alternatif negosiasi yang realistis dan saling menghormati.
4. Menyusun konfirmasi dan tindak lanjut profesional.

## Penilaian pedagogis
Gunakan instrumen uji pengguna: (a) mahasiswa menyelesaikan 4 tahap, (b) menuliskan respons pada satu tahap, (c) dapat menjelaskan kegunaan produk AR, (d) menilai kejelasan navigasi melalui skala 1–5. Implementasi dan hasil uji sesungguhnya belum dilaporkan.
