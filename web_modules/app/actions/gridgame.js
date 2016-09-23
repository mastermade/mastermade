export function step() {
  return {
    type: 'GAME_STEP',
  };
}

export function setHoverCell(cell) {
  return {
    type: 'GAME_HOVER',
    cell,
  };
}

export function addLiveCell(cell) {
  return {
    type: 'ADD_LIVE_CELL',
    cell,
  };
}

export function setCursorDown(cell) {
  return {
    type: 'SET_CURSOR_DOWN',
    cell,
  };
}

export function setCursorUp() {
  return {
    type: 'SET_CURSOR_UP',
  };
}

export function moveCursor(cell) {
  return {
    type: 'MOVE_CURSOR',
    cell,
  };
}

export function playPauseGame() {
  return {
    type: 'PLAY_PAUSE_GAME',
  };
}
