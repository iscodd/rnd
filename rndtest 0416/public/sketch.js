var socket;

function setup() {
  createCanvas(400, 400);
  background(0);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  fill('blue');
  ellipse(data.x, data.y, 20);
}

function mouseDragged() {
  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);
  fill('pink');
  ellipse(mouseX, mouseY, 20);
}

// function draw() {

// }