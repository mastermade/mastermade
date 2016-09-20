import React, { Component, PropTypes } from 'react';
/* eslint-env browser */

import ReactCanvas from 'react-canvas';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { step } from 'app/actions/gridgame';

const Surface = ReactCanvas.Surface;
const Gradient = ReactCanvas.Gradient;

class Grid extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    game: PropTypes.object,
  };

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

  render() {
    const { game: { cells } } = this.props;

    const boxes = _.map(cells, (cell) => {
      const style = {
        left: 5 + (cell[0] * 10),
        top: 5 + (cell[1] * 10),
        width: 9,
        height: 9,
        backgroundColor: '#333333',
      };

      return (<Gradient style={style} />);
    });

    const mouseMove = (evt) => {
      const rect = evt.target.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;
      // console.log('mouse move', evt, x, y);
    };

    return (
      <div onMouseMove={mouseMove}>
        <Surface top={0} left={0} width={5000} height={5000}>
          { boxes }
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
