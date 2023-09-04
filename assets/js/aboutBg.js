const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

const setCanvasSize = () => {
  canvas.width = window.innerWidth;

  if (window.innerHeight < 805) {
    canvas.height = window.innerHeight;
  } else if (window.innerWidth < 500) {
    canvas.height = window.innerHeight / 1.2;
  } else if (window.innerWidth < 600) {
    canvas.height = window.innerHeight / 1.3;
  } else if (window.innerWidth < 1000) {
    canvas.height = window.innerHeight / 1.5;
  } else {
    canvas.height = window.innerHeight / 2;
  }
};

window.addEventListener("resize", () => {
  setCanvasSize();
});

setCanvasSize();

class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw() {
    let angle = (2 * Math.PI) / 5;
    let radius = this.size;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y - radius);

    for (let i = 1; i < 5; i++) {
      radius = this.size;
      ctx.lineTo(this.x + radius * Math.sin(i * angle), this.y - radius * Math.cos(i * angle));
    }

    ctx.closePath();
    ctx.fillStyle = "#00dfa2";
    ctx.fill();
  }

  update(mouse) {
    const distanceToMouse = Math.hypot(this.x - mouse.x, this.y - mouse.y);
    const targetSize = distanceToMouse < 100 ? (100 - distanceToMouse) / 4 : 20;
    this.size += (targetSize - this.size) * 0.1;
  }
}
class Circle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = "#007aff";
    ctx.fill();
  }

  update(mouse) {
    const distanceToMouse = Math.hypot(this.x - mouse.x, this.y - mouse.y);
    const targetSize = distanceToMouse < 100 ? (100 - distanceToMouse) / 4 : 20;
    this.size += (targetSize - this.size) * 0.1;
  }
}

function createPattern() {
  const shapes = [];

  const patternSize = 50;
  const margin = 10;
  const numHorizontal = Math.ceil(canvas.width / (patternSize + margin));
  const numVertical = Math.ceil(canvas.height / (patternSize + margin));

  for (let x = 0; x < numHorizontal; x++) {
    for (let y = 0; y < numVertical; y++) {
      const posX = x * (patternSize + margin) + patternSize / 2 + margin / 2;
      const posY = y * (patternSize + margin) + patternSize / 2 + margin / 2;
      const shape = (x + y) % 2 === 0 ? new Star(posX, posY, 20) : new Circle(posX, posY, 20);
      shapes.push(shape);
    }
  }

  return shapes;
}

const shapes = createPattern();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shapes.forEach((shape) => {
    shape.update(mouse);
    shape.draw();
  });

  requestAnimationFrame(animate);
}
const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.x;
  mouse.y = e.y - rect.top;
});

animate();
