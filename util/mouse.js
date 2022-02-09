// returns mouse position rounded to given unit
export function mousePosition(e, container) {
  // get mouse position
  let mouseX = e.clientX - container.offsetLeft + window.scrollX;
  let mouseY = e.clientY - container.offsetTop + window.scrollY;
  // clamp mouse position
  if (mouseX < 0) mouseX = 0;
  else if (mouseX > container.width - 1) mouseX = container.width - 1;
  if (mouseY < 0) mouseY = 0;
  else if (mouseY > container.height - 1) mouseY = container.height - 1;
  // return mouse position
  return [mouseX, mouseY];
}

// returns index of unit position
export function mouseIndex(e, container, unit, width) {
  // get mouse position
  const [mouseX, mouseY] = mousePosition(e, container);
  // round position
  const unitX = Math.floor(mouseX / unit);
  const unitY = Math.floor(mouseY / unit);
  // return index
  return unitY * width + unitX;
}
