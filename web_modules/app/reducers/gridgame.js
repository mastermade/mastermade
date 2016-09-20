import * as _ from 'lodash';

const gameHeight = 100;
const gameWidth = 100;

const defaultState = {
  cells: [[3, 3], [3, 4], [3, 5],
          [10, 3], [10, 4], [10, 5],
          [19, 3], [19, 4], [19, 5],
          [3, 13], [3, 14], [3, 15],
          [3, 33], [3, 34], [3, 35]],
  hover: null,
};

function getKey(cell) {
  return `${cell[0]},${cell[1]}`;
}

const actions = {
  'GAME_HOVER': (state, action) => {
    return {
      ...state,
      hover: [action.x, action.y],
    };
  },
  'GAME_STEP': (state, action) => {
    const cells = {};
    const liveCells = {};
    const newCells = [];

    const addNeighbor = (cell) => {
      const key = getKey(cell);
      if (cells[key] === undefined) {
        cells[key] = 0;
      }

      cells[key] += 1;
    };

    _.each(state.cells, (cell) => {
      const x = cell[0];
      const y = cell[1];

      liveCells[getKey(cell)] = true;

      const hasTop = cell[1] > 0;
      const hasLeft = cell[0] > 0;
      const hasBottom = cell[1] < gameHeight;
      const hasRight = cell[0] < gameWidth;

      if (hasTop && hasLeft) addNeighbor([x - 1, y - 1]);
      if (hasTop) addNeighbor([x, y - 1]);
      if (hasTop && hasRight) addNeighbor([x + 1, y - 1]);

      if (hasLeft) addNeighbor([x - 1, y]);
      if (hasRight) addNeighbor([x + 1, y]);

      if (hasBottom && hasLeft) addNeighbor([x - 1, y + 1]);
      if (hasBottom) addNeighbor([x, y + 1]);
      if (hasBottom && hasRight) addNeighbor([x + 1, y + 1]);
    });

    _.each(cells, (neighborCount, key) => {
      const isAlive = liveCells[key];

      if ((isAlive && (neighborCount === 2 || neighborCount === 3)) ||
          (!isAlive && (neighborCount === 3))) {
        newCells.push(_.map(key.split(','), n => parseInt(n, 10)));
      }
    });

    return {
      ...state,
      cells: newCells,
    };
  },
};

export default function gridGame(state = defaultState, action) {
  if (actions[action.type]) {
    return actions[action.type](state, action);
  }

  return state;
}
