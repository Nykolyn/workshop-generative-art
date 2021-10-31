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
  const count = 90;
  let palette = random.pick(palettes)
  palette = random.shuffle(palette);
  palette = palette.slice(0, random.rangeFloor(2, palette.length + 1));
  const background = palette.shift();

  const createGrid = () => {
    const points = []
    for (let x = 0; x < count; x += 1) {
      for (let y = 0; y < count; y += 1) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push({
          color: random.pick(palette),
          position: [u, v],
          radius: Math.abs(random.noise2D(u, v)) * 0.1,
          rotation: random.noise2D(u, v)
        })
      }
    }

    return points
  }

  let points = createGrid().filter(() => {
    return Math.random() > 0.5;
  });
  points = random.shuffle(points);

  return ({ context, width, height }) => {
    const margin = width * 0.175;

    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    points.forEach(({ position, radius, color, rotation }) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.save()


      context.fillStyle = color
      context.font = `${radius * width}px "Arial"`
      context.translate(x, y)
      context.rotate(rotation)
      context.fillText('=', 0, 0)

      context.restore()
    })
  };
};

canvasSketch(sketch, settings);
