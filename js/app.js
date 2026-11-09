"use strict";

const produkUmkm = [
  {
    nama: "Pasang Custom ROM",
    kategori: "Firmware",
    harga: 75000,
    stok: 10,
    unggulan: true,
  },
  {
    nama: "Recovery & Root",
    kategori: "Recovery",
    harga: 50000,
    stok: 4,
    unggulan: true,
  },
  {
    nama: "Unbrick QFIL EDL 9008",
    kategori: "Unbrick",
    harga: 75000,
    stok: 0,
    unggulan: false,
  },
  {
    nama: "Debloat Android Vendor",
    kategori: "Optimasi",
    harga: 35000,
    stok: 8,
    unggulan: false,
  },
  {
    nama: "Dual-Boot Windows + Linux",
    kategori: "Optimasi",
    harga: 90000,
    stok: 3,
    unggulan: false,
  },
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

console.log(formatRupiah(75000));

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

console.log(statusStok(0));
console.log(statusStok(4));
console.log(statusStok(10));

function labelKategori(kategori) {
  switch (kategori) {
    case "Firmware":
      return "Layanan instalasi OS";
    case "Recovery":
      return "Paket root & recovery";
    case "Unbrick":
      return "Penanganan darurat EDL";
    case "Optimasi":
      return "Pembersihan sistem";
    default:
      return "Layanan JasaOprek";
  }
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>
      <p class="category-note">${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

function hitungHargaPromo(produk) {
  if (!produk.diskonPersen) {
    return produk.harga;
  }

  return produk.harga - (produk.harga * produk.diskonPersen) / 100;
}

function hitungRingkasanKategori() {
  const jumlahKategori = {};

  produkUmkm.forEach((produk) => {
    const kategori = produk.kategori;

    if (jumlahKategori[kategori]) {
      jumlahKategori[kategori] += 1;
    } else {
      jumlahKategori[kategori] = 1;
    }
  });

  return Object.entries(jumlahKategori)
    .map(([kategori, jumlah]) => `${kategori}: ${jumlah} produk`)
    .join(", ");
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");
  const kategoriRingkasan = document.querySelector("#ringkasan-kategori");

  // app.js is loaded across all pages; exit early when catalog containers are absent.
  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  produkUmkm.forEach((produk) => {
    console.log("Debug produk:", produk.nama, "stok:", produk.stok);
  });

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");
  const ringkasanKategori = hitungRingkasanKategori();

  console.log("Ringkasan kategori:", ringkasanKategori);
  console.log(produkTersedia);
  console.log(produkUnggulan);

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  if (kategoriRingkasan) {
    kategoriRingkasan.textContent = `Ringkasan kategori: ${ringkasanKategori}`;
  }

  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);
