"use strict";

const NEWSLETTER_STORAGE_KEY = "jasaoprek-p12-newsletter";

function simpanLanggananNewsletter(email, frekuensi = "mingguan") {
  const data = {
    email,
    frekuensi,
    terdaftarPada: new Date().toISOString(),
  };

  try {
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
}

function muatLanggananNewsletter() {
  try {
    const rawData = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
    if (!rawData) {
      return null;
    }
    return JSON.parse(rawData);
  } catch (error) {
    localStorage.removeItem(NEWSLETTER_STORAGE_KEY);
    return null;
  }
}

function hapusLanggananNewsletter() {
  localStorage.removeItem(NEWSLETTER_STORAGE_KEY);
}

const formNewsletter = document.querySelector("#form-newsletter");
const inputNewsletterEmail = document.querySelector("#newsletter-email");
const statusNewsletter = document.querySelector("#status-newsletter");

if (formNewsletter && inputNewsletterEmail) {
  formNewsletter.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!inputNewsletterEmail.checkValidity()) {
      if (statusNewsletter) {
        statusNewsletter.textContent = "Masukkan format email yang valid untuk berlangganan.";
      }
      inputNewsletterEmail.focus();
      return;
    }

    const sukses = simpanLanggananNewsletter(inputNewsletterEmail.value);
    if (statusNewsletter) {
      statusNewsletter.textContent = sukses
        ? "Berhasil berlangganan buletin update firmware JasaOprek."
        : "Gagal menyimpan data langganan.";
    }
  });

  const langgananAktif = muatLanggananNewsletter();
  if (langgananAktif && statusNewsletter) {
    statusNewsletter.textContent = `Anda terdaftar berlangganan update firmware (${langgananAktif.email}).`;
  }
}
