/* eslint-env browser */

import React, { Component, PropTypes } from 'react';
import ReactCanvas from 'react-canvas';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import chroma from 'chroma-js';

import { step, setCursorDown, moveCursor, setCursorUp } from 'app/actions/gridgame';

import styles from './style.scss';

const Surface = ReactCanvas.Surface;
const Gradient = ReactCanvas.Gradient;

class Grid extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    game: PropTypes.object,
    cellSize: PropTypes.number,
    hoverOut: PropTypes.number,
  };

  static defaultProps = {
    cellSize: 10,
    hoverOut: 2,
  };

  componentDidMount() {
    let start;
    let last = 0;
    const animator = (timestamp) => {
      const diff = timestamp - last;
      if (diff >= 1000) {
        last = timestamp;

        if (!this.props.game.down) {
          this.props.dispatch(step());
        }
      }

      this.frame = window.requestAnimationFrame(animator);
    };

    this.frame = window.requestAnimationFrame(animator);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frame);
  }

  getCellStyle(cell) {
    const { cellSize } = this.props;

    return {
      left: 1 + (cell[0] * cellSize),
      top: 1 + (cell[1] * cellSize),
      width: cellSize - 1,
      height: cellSize - 1,
      borderWidth: 1,
    };
  }

  getBorderStyle(cell) {
    const baseStyle = this.getCellStyle(cell);

    const borderStyle = {
      ...baseStyle,
      left: baseStyle.left - 0.5,
      top: baseStyle.top - 0.5,
      width: baseStyle.width + 1,
      height: baseStyle.height + 1,
    };

    return borderStyle;
  }

  getEventCell(evt) {
    const { cellSize } = this.props;

    const rect = evt.target.getBoundingClientRect();
    const x = Math.floor((evt.clientX - rect.left) / cellSize);
    const y = Math.floor((evt.clientY - rect.top) / cellSize);

    return [x, y];
  }

  buildHoverGrid() {
    const { game: { hover }, cellSize, hoverOut } = this.props;

    let hoverCells = [];

    for (let x = hover[0] - hoverOut; x <= hover[0] + hoverOut; x += 1) {
      for (let y = hover[1] - hoverOut; y <= hover[1] + hoverOut; y += 1) {
        if (x >= 0 && y >= 0) {
          const level = Math.sqrt(Math.pow((x - hover[0]), 2) +
                                  Math.pow((y - hover[1]), 2));
          hoverCells.push({
            cell: [x, y],
            level,
          });
        }
      }
    }

    hoverCells = _.reverse(_.sortBy(hoverCells, 'level'));

    const hoverBoxes = _.map(hoverCells, (cell) => {
      const scale = chroma.scale(['red', '#ffffff'])
        .domain([0, hoverOut + 1])
        .mode('lab');
      const style = {
        ...this.getBorderStyle(cell.cell),
        borderColor: scale(cell.level),
      };

      return (<Gradient style={style} />);
    });

    return hoverBoxes;
  }

  render() {
    const { game: { cells, hover }, cellSize, dispatch } = this.props;

    const boxes = _.map(cells, (cell) => {
      const style = {
        ...this.getCellStyle(cell),
        backgroundColor: '#333333',
      };

      return (<Gradient style={style} />);
    });

    const hoverEffect = hover ? this.buildHoverGrid() : null;

    const mouseMove = (evt) => {
      dispatch(moveCursor(this.getEventCell(evt)));
    };

    const mouseDownHandler = (evt) => {
      dispatch(setCursorDown(this.getEventCell(evt)));
    };

    const mouseUpHandler = (evt) => {
      dispatch(setCursorUp());
    };

    return (
      <div
        className={styles.container}
        onMouseMove={mouseMove}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
      >
        <Surface top={0} left={0} width={5000} height={5000}>
          { boxes }
          { hoverEffect }
        </Surface>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      game: state.gridgame,
    };
  }
)(Grid);
