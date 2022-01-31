export const objectCount = 16;

export const defaultColors = [
  "#dfdfdf",
  "#9f9f9f",
  "#606060",
  "#202020"
];

export const defaultCodes = Array(objectCount).fill(0).map((val, i) => (
`// GameObject${i}
class GameObject${i} extends GameObject() {
  constructor() {
    // runs when object constructed
    super();
  }
  start() {
    // runs after all objects constructed
  }
  update() {
    // runs once every frame
  }
}
`
));
