import React, { Component, PropTypes } from 'react';
/* eslint-env browser */

import ReactCanvas from 'react-canvas';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { step, setHoverCell } from 'app/actions/gridgame';

const Surface = ReactCanvas.Surface;
const Gradient = ReactCanvas.Gradient;

class Grid extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    game: PropTypes.object,
    cellSize: PropTypes.number,
  };

  getDefaultProps() {
    return {
      cellSize: 10,
    };
  }

  componentDidMount() {
    let start;
    let last = 0;
    const animator = (timestamp) => {
      const diff = timestamp - last;
      if (diff >= 1000) {
        last = timestamp;
        this.props.dispatch(step());
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

  getHoverStyle(cell) {
    const baseStyle = this.getCellStyle(cell);

    const hoverStyle = {
      ...baseStyle,
      left: baseStyle.left - 0.5,
      top: baseStyle.top - 0.5,
      width: baseStyle.width + 1,
      height: baseStyle.height + 1,
      borderColor: 'red',
    };

    return hoverStyle;
  }

  buildHoverGrid() {
    const { game: { hover }, cellSize } = this.props;

    const hoverStyle = this.getHoverStyle(hover);

    return (<Gradient style={hoverStyle} />);
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
      const rect = evt.target.getBoundingClientRect();
      const x = Math.floor((evt.clientX - rect.left) / cellSize);
      const y = Math.floor((evt.clientY - rect.top) / cellSize);
      dispatch(setHoverCell(x, y));
    };

    return (
      <div onMouseMove={mouseMove}>
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
