//all buttons work, but next song will not play automatically.

let gui;
let play;
let nextButton;
let prevButton;
let trackLoop;
let listLoop;
let randomPlay;
let currentSong = 0;
let playList = [
  "playlist/sample1.mp3",
  "playlist/sample2.mp3",
  "playlist/sample3.mp3",
];
let musicList = [];
let vol;
let nowPlaying;
let status = 0;

function preload() {
  soundFormats("mp3", "ogg");
  for (let filename of playList) {
    musicList.push(loadSound(filename));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let x = windowWidth;
  let y = windowHeight;
  gui = createGui();
  play = createButton(
    "⏯",
    (2 * x) / 4 - y / 12,
    (3 * y) / 4 - y / 12,
    y / 6,
    y / 6
  );
  nextButton = createButton(
    "⏭",
    (3 * x) / 4 - y / 12,
    (3 * y) / 4 - y / 12,
    y / 6,
    y / 6
  );
  prevButton = createButton(
    "⏮",
    (1 * x) / 4 - y / 12,
    (3 * y) / 4 - y / 12,
    y / 6,
    y / 6
  );
  reset = createButton(
    "⏹️",
    (2 * x) / 3 - y / 12,
    (1 * y) / 4 - y / 12,
    y / 6,
    y / 6
  );
  trackLoop = createButton(
    "🔂",
    (1 * x) / 3 - y / 12,
    (1 * y) / 4 - y / 12,
    y / 6,
    y / 6
  );
  vol = createSlider(
    "volume",
    (1 * x) / 16,
    (1 * y) / 2 - y / 12,
    (14 * x) / 16,
    y / 6
  );

  nowPlaying = musicList[currentSong];
}

function draw() {
  // stroke(0);
  // fill(70);
  // strokeWeight(10);
  // rect(0, 0, 600, 300);
  drawGui();
  if (nextButton.isPressed) {
    next();
  }
  if (prevButton.isPressed) {
    prev();
  }
  if (play.isPressed) {
    playSong();
  }
  if (vol.isChanged) {
    nowPlaying.setVolume(vol.val);
  }
  if (reset.isPressed) {
    window.location.reload();
  }
  if (trackLoop.isPressed) {
    loopSong();
  }
}

function playSong() {
  if (status == 0) {
    nowPlaying.play();
    status = 1;
  } else {
    status = 0;
    nowPlaying.pause();
  }
}

function next() {
  currentSong++;
  if (currentSong > musicList.length - 1) {
    currentSong = 0;
  }
  nowPlaying.stop();
  nowPlaying = musicList[currentSong];
  nowPlaying.play();
}

function prev() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = musicList.length - 1;
  }
  nowPlaying.stop();
  nowPlaying = musicList[currentSong];
  nowPlaying.play();
}

function loopSong() {
  if (nowPlaying.isLooping()) {
    nowPlaying.setLoop(false);
  } else {
    nowPlaying.setLoop(true);
  }
}