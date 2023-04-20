var socket;

let sample;

function setup() {

  // sample = loadSound('siuuu.mp3');
  sample = loadSound("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");

  createCanvas(400, 400);
  background(0);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  fill('blue');
  ellipse(data.x, data.y, 20);
}

function mousePressed() {

  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);
  fill('pink');
  ellipse(mouseX, mouseY, 20);

  sample.play();

  // if (sample.isPlaying()) {
  //   sample.stop();
  // } else {
  //   sample.play();
  // }
}

// function mousePressed() {
//   if (sample.isPlaying()) {
//     sample.stop();
//   } else {
//     sample.play();
//   }
// }

// function draw() {

// }