export const objectCount = 16;

export const defaultCodes = Array(objectCount).fill(0).map((val, i) => (
`// Object ${i}
class Object${i} extends GameObject() {
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
