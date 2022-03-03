import { spriteSquares } from './units';

// draws sprite at given position
export default function drawSprite(
  ctx, sprite,
  pixelX, pixelY,
  colors, squarePixels
) {
  // for each square
  for (let x = 0; x < spriteSquares; x++) {
    for (let y = 0; y < spriteSquares; y++) {
      // get color
      const squareIndex = y * spriteSquares + x;
      const colorIndex = sprite[squareIndex];
      // skip if empty
      if (colorIndex === -1) continue;
      // set color
      const color = colors[colorIndex];
      ctx.fillStyle = color;
      // fill square
      ctx.fillRect(
        pixelX + x * squarePixels,
        pixelY + y * squarePixels,
        squarePixels,
        squarePixels
      );
    }
  }
}
