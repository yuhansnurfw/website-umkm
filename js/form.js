const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

if (form && preview) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const nama = data.get("nama") || "-";
    const email = data.get("email") || "-";
    const paket = data.get("paket") || "-";
    const topik = data.get("topik") || "-";
    const pesan = data.get("pesan") || "-";

    preview.textContent = [
      "=== DATA PERMINTAAN SERVIS JASAOPREK ===",
      `Nama Pelanggan  : ${nama}`,
      `Email           : ${email}`,
      `Paket Layanan   : ${paket}`,
      `Topik Konsultasi: ${topik}`,
      `Detail / Pesan  : ${pesan}`,
      "========================================",
      "Status: Form terkirim sukses tanpa reload. Teknisi akan segera memproses permintaan Anda.",
    ].join("\n");
  });
}
