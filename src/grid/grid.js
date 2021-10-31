const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')

const lerp = (min, max, t) => {
  return min * (1 - t) + max * t;
}

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const createGrid = () => {
    const points = []
    const count = 200;
    for (let x = 0; x < count; x += 1) {
      for (let y = 0; y < count; y += 1) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push([u, v])
      }
    }

    return points
  }

  random.setSeed(512)
  const points = createGrid().filter(() => random.value() > 0.5)
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.rect(x, y, 4, 4)
      context.strokeStyle = 'black'
      context.lineWidth = 4
      context.stroke();
    })
  };
};

canvasSketch(sketch, settings);
