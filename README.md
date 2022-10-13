# Dreamer RPG

### Fitur saat ini
1. Pergerakan 2 dimensi (hanya x & y)
2. Sistem chat (jika multiplayer aktif)

------------

### Cara menjalankan
**Instal dependencies dahulu**

`npm install`

atau

`npm i`

setelah selesai semua dependencies terinstal lalu jalankan 

`npm run start`

atau 

`parcel index.html`

> karna menggunakan [parcel](https://github.com/parcel-bundler/parcel) untuk build tool dengan entry file ke index.html

------------

###  Perhatian !

**Diperlukan** sebuah `Peer Server` untuk menjalankan fungsi **multiplayer**.

Lihat [disini](https://github.com/peers/peerjs-server) untuk menjalankan Peer Server pada komputer anda.

Lalu pastikan **host, port, path** sudah benar sesuai dengan Peer Server anda & ganti **host, port, path** di file `index.js` jika berbeda

------------

### Cara penggunaan

1. Saat dijalankan / membuka halaman aplikasi web maka akan dimintai sebuah `ID`, diharapkan mengisi `ID` yang **unik** disetiap tab / halaman / pemain.

2. Setelah mengisi `ID` lalu server menerima `ID` tersebut, jika berhasil maka `status` akan menunjukkan kalimat **'Koneksi berhasil'**.

3. Buka tab selanjutnya, lakukan langkah yg sama (no. 1 & 2).

4. Pada tab 2 masukkan `ID` dari tab 1, lalu klik **Koneksikan**.

5. Jika koneksi berhasil maka pemain dari tab lain akan muncul, pergerakan dan chat bisa dilakukan.
