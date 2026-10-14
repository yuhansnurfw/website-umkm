const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

if (form && preview) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const nama = data.get("nama") || "-";
    const email = data.get("email") || "-";
    const telepon = data.get("whatsapp") || data.get("telepon") || "-";
    const tanggal = data.get("tanggal") || "-";
    const waktu = data.get("waktu") || "-";
    const topik = data.get("topik") || "-";
    const kategori = data.get("kategori") || "-";
    const paket = data.get("paket") || "-";
    const pesan = data.get("pesan") || "-";

    preview.textContent = [
      "=== DATA PERMINTAAN SERVIS JASAOPREK ===",
      `Nama Pelanggan    : ${nama}`,
      `Email             : ${email}`,
      `Nomor WhatsApp    : ${telepon}`,
      `Tanggal Servis    : ${tanggal}`,
      `Waktu Konsultasi  : ${waktu}`,
      `Topik Pertanyaan  : ${topik}`,
      `Kategori Chipset  : ${kategori}`,
      `Paket Layanan     : ${paket}`,
      `Detail / Kendala  : ${pesan}`,
      "========================================",
      "Status: Form terkirim sukses tanpa reload. Teknisi akan segera memproses permintaan Anda.",
    ].join("\n");
  });
}
