"use strict";

console.log("P09 JavaScript aktif");

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
];

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.log("Uji formatRupiah:", formatRupiah.format(produkUmkm[0].harga));

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

console.log("Uji statusStok(10):", statusStok(10));
console.log("Uji statusStok(4):", statusStok(4));
console.log("Uji statusStok(0):", statusStok(0));

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

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
    const badgeUnggulan = produk.unggulan
      ? '<span class="product-badge">Unggulan</span>'
      : "";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup = markup + `
      <article class="js-product-card">
        ${badgeUnggulan}
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);
