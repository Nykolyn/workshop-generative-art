const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const lerp = (min, max, t) => {
  return min * (1 - t) + max * t;
}

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const palette = random.pick(palettes)

  const createGrid = () => {
    const points = []
    const count = 40;
    for (let x = 0; x < count; x += 1) {
      for (let y = 0; y < count; y += 1) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push({
          color: random.pick(palette),
          position: [u, v],
          radius: Math.abs(random.gaussian() * 0.01)
        })
      }
    }

    return points
  }

  const points = createGrid().filter(() => random.value() > 0.5)
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(({ position, radius, color }) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, radius * width, 0, Math.PI * 2, false)
      context.strokeStyle = 'black'
      context.lineWidth = 20
      context.fillStyle = color
      context.fill();
    })
  };
};

canvasSketch(sketch, settings);
