export function step() {
  return {
    type: 'GAME_STEP',
  };
}

export function setHoverCell(x, y) {
  return {
    type: 'GAME_HOVER',
    x,
    y,
  };
}
