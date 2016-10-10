import * as _ from 'lodash';

const gameHeight = 100;
const gameWidth = 100;

const defaultState = {
  cells: {},
  hover: null,
  down: false,
  paused: false,
};

function getKey(cell) {
  return `${cell[0]},${cell[1]}`;
}

const actions = {
  'ADD_SHAPE': (state, action) => {
    const rows = action.shape.split('\n');

    const newCells = _.fromPairs(_.filter(_.flatten(_.map(rows, (row, y) => {
      const cells = row.split('');

      return _.map(cells, (text, x) => {
        if (text === 'O') {
          const coordinates = [action.x + x, action.y + y];
          return [getKey(coordinates), { color: action.color }];
        }

        return null;
      });
    }))));

    return {
      ...state,
      cells: {
        ...state.cells,
        ...newCells,
      },
    };
  },
  'ADD_LIVE_CELL': (state, action) => {
    const key = getKey(action.cell);

    if (state.cells[key]) {
      return state;
    }

    return {
      ...state,
      cells: {
        ...state.cells,
        [key]: { color: _.random(0, 2) },
      },
    };
  },
  'MOVE_CURSOR': (state, action) => {
    const addState = state.down ? actions.ADD_LIVE_CELL(state, action) : state;
    return {
      ...addState,
      hover: action.cell,
    };
  },
  'SET_CURSOR_DOWN': (state, action) => {
    return {
      ...actions.ADD_LIVE_CELL(state, action),
      down: true,
    };
  },
  'SET_CURSOR_UP': (state, action) => {
    return {
      ...state,
      down: false,
    };
  },
  'PLAY_PAUSE_GAME': (state, action) => {
    return {
      ...state,
      paused: !state.paused,
    };
  },
  'GAME_STEP': (state, action) => {
    if (state.paused || state.down) {
      return state;
    }

    const cells = {};
    const liveCells = {};
    const newCells = {};

    const addNeighbor = (cell, parent) => {
      const key = getKey(cell);

      if (cells[key] === undefined) {
        cells[key] = {};
      }

      if (cells[key][parent] === undefined) {
        cells[key][parent] = 0;
      }

      cells[key][parent] += 1;
    };

    _.each(state.cells, (cell, key) => {
      const coordinates = _.map(key.split(','), n => parseInt(n, 10));
      const x = coordinates[0];
      const y = coordinates[1];
      const cellType = cell.color;

      liveCells[getKey(coordinates)] = true;

      const hasTop = y > 0;
      const hasBottom = y < gameHeight;
      const hasLeft = x > 0;
      const hasRight = x < gameWidth;

      if (hasTop && hasLeft) addNeighbor([x - 1, y - 1], cellType);
      if (hasTop) addNeighbor([x, y - 1], cellType);
      if (hasTop && hasRight) addNeighbor([x + 1, y - 1], cellType);

      if (hasLeft) addNeighbor([x - 1, y], cellType);
      if (hasRight) addNeighbor([x + 1, y], cellType);

      if (hasBottom && hasLeft) addNeighbor([x - 1, y + 1], cellType);
      if (hasBottom) addNeighbor([x, y + 1], cellType);
      if (hasBottom && hasRight) addNeighbor([x + 1, y + 1], cellType);
    });

    _.each(cells, (neighbors, key) => {
      const isAlive = liveCells[key];

      const neighborCount = _.sum(_.values(neighbors));
      const newType = _.maxBy(_.keys(neighbors), cellType => neighbors[cellType]);

      if ((isAlive && (neighborCount === 2 || neighborCount === 3)) ||
          (!isAlive && (neighborCount === 3))) {
        newCells[key] = { color: parseInt(newType, 10) };
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
