const randomPosition = () => {
  let randX = Math.floor(Math.random() * 11) + 1;
  let randY = Math.floor(Math.random() * 9) + 1;
  return { x: randX, y: randY };
};

export default randomPosition;
