// returns mouse position rounded to given unit
export function unitPosition(e, container, unit) {
  // get mouse position
  const mouseX = e.clientX - container.offsetLeft + window.scrollX;
  const mouseY = e.clientY - container.offsetTop + window.scrollY;
  // get rounded position
  const unitX = Math.floor(mouseX / unit);
  const unitY = Math.floor(mouseY / unit);
  return [unitX, unitY];
}

// returns index of unit position
export function unitIndex(e, container, unit, width) {
  const [unitX, unitY] = unitPosition(e, container, unit);
  return unitY * width + unitX;
}
