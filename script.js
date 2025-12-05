document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) {
    e.preventDefault();
  }
});

const messages = [
  "Tap dimana aja bebas asal jangan ditampol ( ͒•·̫|",
  "(づ ◕‿◕ )づ Hai bubub",
  "kemarin kamu ngalamin hari yang buruk ya",
  "gapapa tetap semangat ya",
  "jangan sedih sedih lagi",
  "jangan nangis eh boleh deng gapapa hahaha",
  "aku bangga deh sama kamu",
  "karena kamu udah ngelewatin ini sendirian,\n udah bertahan sejauh ini",
  "jadi... makasih yaa kamu udah berusaha sebaik mungkin dan selalu ngelakuin yang terbaik",
  "i wish kamu selalu berada di tempat yang membuat kamu nyaman,\ndan dikelilingi sama orang orang yang ngerecharge energi kamu",
  "kalo gada tempat\nkamu masih punya satu space yang luas",
  "ada aku yang selalu terbuka buat kamu berteduh, buat kamu pulang",
  "aku hanya ingin kamu tidak selalu merasa sendiri,\n di saat kamu lelah ragu kamu butuh sesuatu cari aja aku",
  "i hope something so beautiful happens to u\n,that u will forget evrything that has ever hurt u",
  "aku cuma mau bilang",
  "tetap semangat ya cantik nya aku sayang nya aku",
  "(づ ￣ ³￣)づ yeah ur my fineshyt ❤️",
  "tetap semangat jangan berhenti di tengah jalan",
  "tidak ada kehidupan tanpa masalah, dan tidak ada perjuangan tanpa rasa lelah",
  "be pround pf urself because god is pround of u",
  "mwahhh",
  "coba pencet tombol dibawah ini ",
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
  $(".message").text(messages[currentPage]);

  // ===================================
  // KODE BARU UNTUK TOMBOL LANJUT
  // ===================================
  $(".next-button").on("click", function () {
    // 1. NON-AKTIFKAN ANIMASI JANTUNG (opsional, agar halaman bersih)
    clearInterval(love);

    // 2. SEMBUNYIKAN SEMUA ELEMEN LAMA
    $(".bg_heart").hide();

    // 3. TAMPILKAN KONTEN HALAMAN BARU

    // CONTOH: Tampilkan pesan khusus di layar
    $("body").append(
      '<div class="final-page" style="text-align: center; color: white; padding-top: 100px;"><h1>SELAMAT! ❤️</h1><p style="font-size: 1.5em;">Terima kasih sudah membaca semua pesanku. Ini adalah halaman final!</p></div>'
    );

    // CONTOH LAIN: Ganti lokasi halaman (Jika Anda punya halaman lain)
    // window.location.href = "halaman-final.html";
  });

  isLastPage = currentPage === messages.length - 1;

  if (isLastPage) {
    $(".next-button").show();
    $(".bg_heart").css("cursor", "default");
  } else {
    $(".next-button").hide();
    $(".bg_heart").css("cursor", "pointer");
  }
}

$(".bg_heart").on("click", function () {
  if (!isLastPage) {
    currentPage++;
    showMessage();
  }
});

var love = setInterval(function () {
  var r_num = Math.floor(Math.random() * 40) + 1;
  var r_size = Math.floor(Math.random() * 65) + 10;
  var r_left = Math.floor(Math.random() * 100) + 1;
  var r_bg = Math.floor(Math.random() * 25) + 100;
  var r_time = Math.floor(Math.random() * 5) + 5;

  $(".bg_heart").append(
    "<div class='heart' style='width:" +
      r_size +
      "px;height:" +
      r_size +
      "px;left:" +
      r_left +
      "%;background:rgba(255," +
      (r_bg - 25) +
      "," +
      r_bg +
      ",1);animation:love " +
      r_time +
      "s ease'></div>"
  );

  $(".bg_heart").append(
    "<div class='heart' style='width:" +
      (r_size - 10) +
      "px;height:" +
      (r_size - 10) +
      "px;left:" +
      (r_left + r_num) +
      "%;background:rgba(255," +
      (r_bg - 25) +
      "," +
      (r_bg + 25) +
      ",1);animation:love " +
      (r_time + 5) +
      "s ease'></div>"
  );

  $(".heart").each(function () {
    var top = parseFloat($(this).css("top"));
    var width = parseFloat($(this).css("width"));
    if (top <= -100 || width >= 150) {
      $(this).remove();
    }
  });
}, 500);

showMessage();

function clearMusicState() {
  localStorage.removeItem("musicPlaying");
  localStorage.removeItem("musicCurrentTime");
}

window.onload = function () {
  clearMusicState();
};

function setupMusic() {
  const music = document.getElementById("backgroundMusic");

  if (!localStorage.getItem("initialLoad")) {
    clearMusicState();
    localStorage.setItem("initialLoad", "true");
    music.currentTime = 0;
  }

  const isMusicPlaying = localStorage.getItem("musicPlaying") === "true";
  const musicCurrentTime = localStorage.getItem("musicCurrentTime") || 0;

  if (isMusicPlaying) {
    music.currentTime = parseFloat(musicCurrentTime);
    music.play().catch((error) => console.log("Playback failed", error));
  }

  music.addEventListener("play", () => {
    localStorage.setItem("musicPlaying", "true");
  });

  music.addEventListener("pause", () => {
    localStorage.setItem("musicPlaying", "false");
  });

  setInterval(() => {
    localStorage.setItem("musicCurrentTime", music.currentTime);
  }, 1000);

  document.addEventListener("click", function startMusic() {
    music.play().catch((error) => {
      console.log("Autoplay prevented", error);
    });
    document.removeEventListener("click", startMusic);
  });
}

document.addEventListener("DOMContentLoaded", setupMusic);
