import styles from '../styles/components/Draw.module.css';

export default function Draw() {
  function mouseDown(e) {
    lastX = undefined;
    lastY = undefined;
    sketching = true;
    sketch(e);
  }

  function mouseMove(e) {
    if (sketching) sketch(e);
  }

  function mouseUp(e) {
    sketching = false;
  }

  function mouseLeave(e) {
    sketching = false;
  }

  return (
    <div>
      <canvas
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        onMouseLeave={mouseLeave}
      />
    </div>
  );
}
