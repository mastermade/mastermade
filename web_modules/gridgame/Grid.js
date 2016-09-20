import React, { Component } from 'react';
import ReactCanvas from 'react-canvas';
import * as _ from 'lodash';

const Surface = ReactCanvas.Surface;
const Gradient = ReactCanvas.Gradient;

class Grid extends Component {
  render() {
    const boxes = _.flatten(_.times(10, (i) => {
      return _.times(10, (n) => {
        const style = {
          top: 5 + (n * 4),
          left: 5 + (i * 4),
          width: 3,
          height: 3,
          borderColor: '#333333',
        };

        return (<Gradient style={style} />);
      });
    }));

    const mouseMove = (evt) => {
      const rect = evt.target.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;
      console.log('mouse move', evt, x, y);
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

export default Grid;
