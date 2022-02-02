const fillColor = '#000';

// fills hover marker with given dimensions
export function fillHover(ctx, border, x, y, width, height) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, border * 2, border);
  ctx.fillRect(x, y, border, border * 2);
  ctx.fillRect(x + width - border * 2, y, border * 2, border);
  ctx.fillRect(x + width - border, y, border, border * 2);
  ctx.fillRect(x, y + height - border, border * 2, border);
  ctx.fillRect(x, y + height - border * 2, border, border * 2);
  ctx.fillRect(x + width - border * 2, y + height - border, border * 2, border);
  ctx.fillRect(x + width - border, y + height - border * 2, border, border * 2);
}

// fills border marker with given dimensions
export function fillBorder(ctx, border, x, y, width, height) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, width, border);
  ctx.fillRect(x, y, border, width);
  ctx.fillRect(x + width - border, y, border, height);
  ctx.fillRect(x, y + height - border, width, border);
}
