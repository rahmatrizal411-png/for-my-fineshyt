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
  "(っ◞‸◟c) kemarin kamu ngalamin hari yang buruk ya",
  "（＾ω＾）gapapa tetap semangat ya",
  "（＾ω＾）jangan sedih sedih lagi",
  "（＾ω＾）jangan nangis eh boleh deng gapapa hahaha",
  "（＾ω＾）aku bangga deh sama kamu",
  "(；⌣̀_⌣́) karena kamu udah ngelewatin ini sendirian, udah bertahan sejauh ini",
  "(；⌣̀_⌣́) jadi... makasih yaa kamu udah berusaha sebaik mungkin dan selalu ngelakuin yang terbaik",
  "ｄ(*￣o￣) i wish kamu selalu berada di tempat yang membuat kamu nyaman, dan dikelilingi sama orang orang yang ngerecharge energi kamu",
  "ｄ(*￣o￣) kalo gada tempat, kamu masih punya satu space yang luas",
  "(* ≧∀≦ *) ada aku yang selalu terbuka buat kamu berteduh, buat kamu pulang",
  "ｄ(*￣o￣) aku hanya ingin kamu tidak selalu merasa sendiri, di saat kamu lelah ragu kamu butuh sesuatu cari aja aku",
  "ｄ(*￣o￣) i hope something so beautiful happens to u,that u will forget evrything that has ever hurt u",
  "ｄ(*￣o￣) aku cuma mau bilang",
  "(* ≧∀≦ *) tetap semangat ya cantik nya aku sayang nya aku",
  "(づ ￣ ³￣)づ yeah ur my fineshyt ❤️",
  "(* ≧∀≦ *) tetap semangat jangan berhenti di tengah jalan",
  "ｄ(*￣o￣) tidak ada kehidupan tanpa masalah, dan tidak ada perjuangan tanpa rasa lelah",
  "( ´˘ᴗ˘)♡ be pround of urself because god is pround of u",
  "(ɔˆ ³(ˆ⌣ˆc) mwahhh",
  "coba pencet tombol dibawah ini ( ͒•·̫| ",
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
  $(".message").text(messages[currentPage]); // =================================== // KODE BARU UNTUK TOMBOL LANJUT // ===================================

  $(".next-button").on("click", function () {
    // Cek apakah halaman final sudah ada di DOM
    if ($(".final-page").length === 0) {
      // 1. NON-AKTIFKAN ANIMASI JANTUNG
      clearInterval(love); // 2. SEMBUNYIKAN SEMUA ELEMEN LAMA

      $(".bg_heart").hide(); // 3. TAMPILKAN KONTEN HALAMAN BARU (FULL LAYAR & TEKS KUSTOM)

      $("body").append(
        '<div class="final-page" style="text-align: center; background-color: white; padding-top: 0; height: 100vh; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; position: fixed; top: 0; left: 0;">' +
          '<h1 style="color: black;">SEMANGAT BUAT HARI INI! ✨</h1>' +
          '<p style="font-size: 1.8em; color: black; margin-top: 30px;">Jangan lupa berbahagialah</p>' +
          '<p style="font-size: 1em; color: #555;">from me make u happy (>‿♥)</p>' +
          "</div>"
      );
    }
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

// ===================================
// FUNGSI MUSIK DENGAN LOOP 0 DETIK HINGGA 60 DETIK
// ===================================
function setupMusic() {
  const music = document.getElementById("backgroundMusic"); // Batas waktu loop (0 detik sampai 60 detik)

  const LOOP_START_TIME = 0;
  const LOOP_END_TIME = 60;

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
  }); // Logika untuk mencek waktu dan melompat kembali

  setInterval(() => {
    localStorage.setItem("musicCurrentTime", music.currentTime); // Jika waktu saat ini melebihi 60 detik, kembalikan ke 0 detik
    if (music.currentTime >= LOOP_END_TIME) {
      music.currentTime = LOOP_START_TIME;
    }
  }, 1000);

  document.addEventListener("click", function startMusic() {
    // Saat klik pertama, pastikan musik dimulai dari awal (detik ke-0)
    music.currentTime = LOOP_START_TIME;
    music.play().catch((error) => {
      console.log("Autoplay prevented", error);
    });
    document.removeEventListener("click", startMusic);
  });
}

document.addEventListener("DOMContentLoaded", setupMusic);
