import React, { Component, PropTypes } from 'react';
import { BodyContainer } from 'phenomic';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

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
        <div className={styles.tilepage}>
          <div className={styles.home}>MasterMade</div>
          <div className={styles.navigation}>
            <div className={styles.about}>About</div>
            <div className={styles.services}>Services</div>
            <div className={styles.portfolio}>Portfolio</div>
          </div>
        </div>
      </Page>
    );
  }
}

Homepage.propTypes = {
  body: PropTypes.string.isRequired,
};

export default Homepage;
