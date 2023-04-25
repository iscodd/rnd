var socket;

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

  // socket = io.connect('http://10.23.10.87:3000');
  socket = io.connect('localhost:3000');
  socket.on('newControl', newControl);
}


function newControl(message) {
  console.log(message);
  drawGui();
  if (message = 'next') {
    next();
  }
  if (message = 'prev') {
    prev();
  }
  if (message = 'play') {
    playSong();
  }
  if (message = 'volChange') {
    nowPlaying.setVolume(vol.val);
  }
  if (message = 'reset') {
    window.location.reload();
  }
  if (message = 'loop') {
    loopSong();
  }
}


function draw() {
  drawGui();
  let message;
  if (nextButton.isPressed) {
    next();
    message = 'next';
    socket.emit('controlMessage', message)
  }
  if (prevButton.isPressed) {
    prev();
    message = 'prev';
    socket.emit('controlMessage', message)
  }
  if (play.isPressed) {
    playSong();
    message = 'play';
    socket.emit('controlMessage', message)
  }
  if (vol.isChanged) {
    nowPlaying.setVolume(vol.val);
    message = 'volChange';
    socket.emit('controlMessage', message)
  }
  if (reset.isPressed) {
    window.location.reload();
    message = 'reset';
    socket.emit('controlMessage', message)
  }
  if (trackLoop.isPressed) {
    loopSong();
    message = 'loop';
    socket.emit('controlMessage', message)
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