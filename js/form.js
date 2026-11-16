"use strict";

const STORAGE_KEY = "jasaoprek-p12-preferensi";

const form = document.querySelector("#form-kontak");
const statusForm = document.querySelector("#status-form");
const preview = document.querySelector("#preview-form");
const channels = document.querySelectorAll("[data-channel]");
const tombolSimpan = document.querySelector("#simpan-preferensi");
const tombolHapus = document.querySelector("#hapus-preferensi");
const statusPreferensi = document.querySelector("#status-preferensi");

const fieldIds = ["nama", "email", "telepon", "tanggal", "waktu", "kategori", "paket", "pesan", "setuju"];
const fields = fieldIds
  .map((id) => document.querySelector("#" + id))
  .filter(Boolean);

const radioTopik = document.querySelectorAll('input[name="topik"]');

function getPesanError(field) {
  if (field.validity.valueMissing) {
    switch (field.id) {
      case "nama":
        return "Nama wajib diisi.";
      case "email":
        return "Email wajib diisi.";
      case "telepon":
        return "Nomor telepon wajib diisi.";
      case "tanggal":
        return "Tanggal servis wajib dipilih.";
      case "waktu":
        return "Waktu konsultasi wajib dipilih.";
      case "paket":
        return "Pilih paket yang diminati.";
      case "pesan":
        return "Pesan wajib diisi.";
      case "setuju":
        return "Konfirmasi persetujuan wajib dicentang.";
      default:
        return "Field ini wajib diisi.";
    }
  }

  if (field.validity.typeMismatch) {
    if (field.type === "email") {
      return "Format email belum benar.";
    }
    return "Format isian tidak sesuai.";
  }

  if (field.validity.tooShort) {
    return `Minimal ${field.minLength} karakter.`;
  }

  if (field.validity.patternMismatch) {
    if (field.id === "telepon") {
      return "Format nomor telepon belum sesuai.";
    }
    return "Pola input belum sesuai format yang diminta.";
  }

  return "";
}

function validasiField(field) {
  // Empty string clears custom validity so the browser re-evaluates native constraints.
  const pesan = getPesanError(field);
  const errorElement = document.querySelector("#" + field.id + "-error");

  field.setCustomValidity(pesan);
  field.setAttribute("aria-invalid", pesan ? "true" : "false");

  if (errorElement) {
    errorElement.textContent = pesan;
  }

  return pesan === "";
}

function validasiRadioTopik() {
  if (radioTopik.length === 0) {
    return true;
  }

  const adaYangDipilih = Array.from(radioTopik).some((item) => item.checked);
  const pesan = adaYangDipilih ? "" : "Pilih salah satu topik pertanyaan.";
  const topikError = document.querySelector("#topik-error");

  radioTopik[0].setCustomValidity(pesan);

  if (topikError) {
    topikError.textContent = pesan;
  }

  return adaYangDipilih;
}

function simpanPreferensi() {
  const preferensi = {
    channel: Array.from(channels)
      .filter((item) => item.checked)
      .map((item) => item.value),
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferensi));
    if (statusPreferensi) {
      statusPreferensi.textContent = "Preferensi tersimpan di localStorage.";
      statusPreferensi.className = "status-preferensi status-success";
    }
  } catch (error) {
    if (statusPreferensi) {
      statusPreferensi.textContent = "Gagal menyimpan preferensi ke storage.";
      statusPreferensi.className = "status-preferensi status-error";
    }
  }
}

function muatPreferensi() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      return;
    }

    // Try-catch defends against corrupted JSON data in storage so the page never crashes.
    const preferensi = JSON.parse(rawData);
    channels.forEach((item) => {
      item.checked = preferensi.channel?.includes(item.value) ?? false;
    });

    if (statusPreferensi) {
      statusPreferensi.textContent = "Preferensi berhasil dimuat.";
      statusPreferensi.className = "status-preferensi status-success";
    }
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    channels.forEach((item) => {
      item.checked = false;
    });

    if (statusPreferensi) {
      statusPreferensi.textContent = "Data preferensi rusak dan sudah dihapus.";
      statusPreferensi.className = "status-preferensi status-warning";
    }
  }
}

function hapusPreferensi() {
  localStorage.removeItem(STORAGE_KEY);
  channels.forEach((item) => {
    item.checked = false;
  });

  if (statusPreferensi) {
    statusPreferensi.textContent = "Preferensi berhasil dihapus dari localStorage.";
    statusPreferensi.className = "status-preferensi status-info";
  }
}

if (form) {
  fields.forEach((field) => {
    field.addEventListener("input", () => validasiField(field));
    field.addEventListener("change", () => validasiField(field));
  });

  radioTopik.forEach((radio) => {
    radio.addEventListener("change", () => validasiRadioTopik());
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const semuaFieldValid = fields.map((field) => validasiField(field)).every(Boolean);
    const topikValid = validasiRadioTopik();

    if (!semuaFieldValid || !topikValid || !form.checkValidity()) {
      if (statusForm) {
        statusForm.textContent = "Perbaiki field yang ditandai sebelum mengirim formulir.";
        statusForm.className = "status-form status-error";
      }

      form.reportValidity();

      // Focus management directs keyboard users and screen readers to the first invalid field.
      const firstInvalid = form.querySelector(":invalid");
      firstInvalid?.focus();
      return;
    }

    const data = new FormData(form);
    const labelSetuju = data.get("setuju") ? "Disetujui" : "Belum disetujui";

    if (preview) {
      preview.textContent = [
        "=== DATA PERMINTAAN SERVIS JASAOPREK ===",
        `Nama Pelanggan    : ${data.get("nama")}`,
        `Email             : ${data.get("email")}`,
        `Nomor Telepon/WA  : ${data.get("telepon")}`,
        `Tanggal Servis    : ${data.get("tanggal")}`,
        `Waktu Konsultasi  : ${data.get("waktu")}`,
        `Topik Pertanyaan  : ${data.get("topik")}`,
        `Kategori Chipset  : ${data.get("kategori") || "-"}`,
        `Paket Layanan     : ${data.get("paket")}`,
        `Detail / Kendala  : ${data.get("pesan")}`,
        `Persetujuan       : ${labelSetuju}`,
        "========================================",
        "Status: Form valid dan siap diproses oleh teknisi JasaOprek.",
      ].join("\n");
    }

    if (statusForm) {
      statusForm.textContent = "Form valid dan siap diproses.";
      statusForm.className = "status-form status-success";
    }
  });
}

if (tombolSimpan) {
  tombolSimpan.addEventListener("click", simpanPreferensi);
}

if (tombolHapus) {
  tombolHapus.addEventListener("click", hapusPreferensi);
}

muatPreferensi();
