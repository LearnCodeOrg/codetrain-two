// returns mouse position rounded to given unit
export function mousePosition(e, container) {
  // get mouse position
  const mouseX = e.clientX - container.offsetLeft + window.scrollX;
  const mouseY = e.clientY - container.offsetTop + window.scrollY;
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
