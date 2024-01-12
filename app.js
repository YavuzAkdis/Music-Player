const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic(); // Sayfa yüklendiği anda müziği göster
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

function displayMusic(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  //container  elemanında sınıfları içerisinde "playing" var mı?
  isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => {
  prevMusic();
});

next.addEventListener("click", () => {
  nextMusic();
});

function prevMusic() {
  player.prev();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
}

function nextMusic() {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
}

function pauseMusic() {
  container.classList.remove("playing"); //playing sınıfı ekler
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
}

function playMusic() {
  container.classList.add("playing"); // playing sınıfı siler
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
}

// arrow function tanımlama
const calculateTİme = (toplamSaniye) => {
  const dakika = Math.floor(toplamSaniye / 60);
  const saniye = Math.floor(toplamSaniye % 60);
  const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuc = `${dakika}:${guncellenenSaniye}`;
  return sonuc;
};
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTİme(audio.duration);
  progressBar.max = Math.floor(audio.duration); // Sarkının toplam kaç saniye olduğunu göster
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTİme(progressBar.value); // Kacıncı saniyede olduğunu göster
});

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTİme(progressBar.value);
  audio.currentTime = progressBar.value; //progressBar ile müzik ileri-geri oynatma
});

let sesDurumu = "sesli";
volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
  }
});
volume.addEventListener("click", () => {
  if (sesDurumu === "sesli") {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

// Müzik Listesi
const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
         <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
              <span>${list[i].getName()}</span>
              <span id="music-${i}" class="badge bg-primary rounded-pill">3:40</span>
              <audio class="music-${i}"src="mp3/${list[i].file}"></audio>
         </li>
        `;

    ul.insertAdjacentHTML("beforeend", liTag);
    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTİme(liAudioTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};

const isPlayingNow = () => {
  for (let li of ul.querySelector("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove(playing);
    }
    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

audio.addEventListener("ended", () => {
  //Müzik bitince sonrakine geçsin
  nextMusic();
});
