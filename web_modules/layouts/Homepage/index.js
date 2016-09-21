import React, { Component, PropTypes } from 'react';
import { BodyContainer } from 'phenomic';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Link from 'phenomic/lib/Link';

import Page from '../Page';

import styles from './style.scss';

const isBrowser = typeof window !== 'undefined';
const Grid = isBrowser ? require('../../gridgame/Grid').default : null;

class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const { body } = this.props;

    const background = isBrowser ? (<Grid cellSize={10} />) : null;

    return (
      <Page {...this.props}>
        Homepage
      </Page>
    );
  }
}

Homepage.propTypes = {
  body: PropTypes.string.isRequired,
};

export default Homepage;
