import { objectCount } from './units';

export const defaultColors = [
  "#dfdfdf",
  "#9f9f9f",
  "#606060",
  "#202020"
];

const defaultObjectSprite = [
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 3, 3, 3, 3, 0, 0,
  0, 0, 3, 3, 3, 3, 0, 0,
  0, 0, 3, 3, 3, 3, 0, 0,
  0, 0, 3, 3, 3, 3, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0
];

const defaultTileSprite = [
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0
];

export const defaultObjectSprites = Array(objectCount).fill(0).map(val =>
  defaultObjectSprite
);

export const defaultTileSprites = Array(objectCount).fill(0).map(val =>
  defaultTileSprite
);

export const defaultCodes = Array(objectCount).fill(0).map((val, i) => (
`// GameObject${i}
return class GameObject${i} extends GameObject {
  constructor(self) {
    super(self);
    // runs before objects constructed
  }
  start() {
    // runs after all objects constructed
  }
  update() {
    // runs once every frame
    if (isKey('w')) this.move('up');
    if (isKey('a')) this.move('left');
    if (isKey('s')) this.move('down');
    if (isKey('d')) this.move('right');
  }
}
`
));

export const defaultObjects = [];

export const defaultTiles = [
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0
];
