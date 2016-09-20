import React, { Component, PropTypes } from 'react';
import { BodyContainer } from 'phenomic';
import { connect } from 'react-redux';

import Page from '../Page';

const isBrowser = typeof window !== 'undefined';
const Grid = isBrowser ? require('../../gridgame/Grid') : null;

class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const { body } = this.props;

    const background = isBrowser ? (<Grid cellSize={10} />) : null;

    return (
      <Page {...this.props}>
        <BodyContainer>{ body }</BodyContainer>
        {background}
      </Page>
    );
  }
}

Homepage.propTypes = {
  body: PropTypes.string.isRequired,
};

export default Homepage;
