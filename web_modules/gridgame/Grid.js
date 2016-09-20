import React, { Component } from 'react';
import ReactCanvas from 'react-canvas';
import * as _ from 'lodash';

const Surface = ReactCanvas.Surface;
const Gradient = ReactCanvas.Gradient;

class Grid extends Component {
  render() {
    const boxes = _.times(1500, (n) => {
      const style = {
        top: n * 3,
        left: 10,
        width: 20,
        height: 2,
        backgroundColor: '#333333',
      };

      return (<Gradient style={style} />);
    });

    return (
      <Surface top={0} left={0} width={500} height={5000}>
        { boxes }
      </Surface>
    );
  }
}

export default Grid;
