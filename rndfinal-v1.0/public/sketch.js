var socket;
let sample;

function setup() {
  sample = loadSound("siuuu.mp3");
  createCanvas(400, 400);
  background(0);
  socket = io.connect('http://10.23.10.87:3000');
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
}