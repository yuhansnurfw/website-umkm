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

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

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

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");
const produkUnggulanEl = document.querySelector("#produk-unggulan");
const ringkasanKategoriEl = document.querySelector("#ringkasan-kategori");

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = `${produk.kategori} (${labelKategori(produk.kategori)})`;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.classList.add("ghost-button");

  // Removes the card node from the DOM only; produkUmkm stays intact for re-filtering.
  removeButton.addEventListener("click", () => {
    card.remove();
    produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
  });

  card.append(title, category, price, stock, removeButton);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  // app.js is loaded across all pages; exit early when catalog containers are absent.
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  console.log("Render kategori:", kategoriAktif);
  console.table(produkTampil);

  produkGrid.replaceChildren();

  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  if (produkUnggulanEl) {
    produkUnggulanEl.textContent = produkUnggulan
      ? `Produk unggulan: ${produkUnggulan.nama}`
      : "Belum ada produk unggulan.";
  }

  if (ringkasanKategoriEl) {
    ringkasanKategoriEl.textContent = `Ringkasan kategori: ${hitungRingkasanKategori()}`;
  }

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = `0 produk ditemukan (Kategori ${kategoriAktif} menampilkan 0 produk dari ${produkUmkm.length} total produk).`;
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan (Kategori ${kategoriAktif} menampilkan ${produkTampil.length} produk dari ${produkUmkm.length} total produk).`;
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

if (produkGrid && produkStatus) {
  console.log("Target grid:", produkGrid);
  console.log("Target status:", produkStatus);
  console.log("Jumlah tombol filter:", tombolFilter.length);
}

renderProduk();
