const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

if (form && preview) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const nama = data.get("nama") || "-";
    const email = data.get("email") || "-";
    const telepon = data.get("telepon") || "-";
    const paket = data.get("paket") || "-";
    const topik = data.get("topik") || "-";
    const waktu = data.get("waktu") || "-";
    const pesan = data.get("pesan") || "-";

    preview.textContent = [
      "=== DATA PERMINTAAN SERVIS JASAOPREK ===",
      `Nama Pelanggan  : ${nama}`,
      `Email           : ${email}`,
      `Nomor WhatsApp  : ${telepon}`,
      `Paket Layanan   : ${paket}`,
      `Topik Konsultasi: ${topik}`,
      `Waktu Dihubungi : ${waktu}`,
      `Detail / Pesan  : ${pesan}`,
      "========================================",
      "Status: Form terkirim sukses tanpa reload. Teknisi akan segera memproses permintaan Anda.",
    ].join("\n");
  });
}
