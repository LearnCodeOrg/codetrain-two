// fills hover marker with given dimensions
export function fillHover(ctx, border, x, y, width, height) {
  ctx.fillStyle = '#000';
  ctx.fillRect(x, y, border * 2, border);
  ctx.fillRect(x, y, border, border * 2);
  ctx.fillRect(x + width - border * 2, y, border * 2, border);
  ctx.fillRect(x + width - border, y, border, border * 2);
  ctx.fillRect(x, y + height - border, border * 2, border);
  ctx.fillRect(x, y + height - border * 2, border, border * 2);
  ctx.fillRect(x + width - border * 2, y + height - border, border * 2, border);
  ctx.fillRect(x + width - border, y + height - border * 2, border, border * 2);
}
