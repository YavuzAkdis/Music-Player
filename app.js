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

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic(); // Sayfa yüklendiği anda müziği göster
  displayMusic(music);
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
}

function nextMusic() {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
}

function pauseMusic() {
  container.classList.remove("playing"); //playing sınıfı ekler
  play.classList = "fa-solid fa-play";
  audio.pause();
}

function playMusic() {
  container.classList.add("playing"); // playing sınıfı siler
  play.classList = "fa-solid fa-pause";
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
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTİme(progressBar.value); // Kacıncı saniyede olduğunu göster
});

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTİme(progressBar.value);
  audio.currentTime = progressBar.value;
});
