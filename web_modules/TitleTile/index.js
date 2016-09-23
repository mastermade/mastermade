import React, { Component, PropTypes } from 'react';
import Link from 'phenomic/lib/Link';
import classNames from 'classnames';

import styles from './style.scss';

const isBrowser = typeof window !== 'undefined';
const Grid = isBrowser ? require('../gridgame/Grid').default : null;

export default class TitleTile extends Component {
  static propTypes = {
    active: PropTypes.bool,
  };

  render() {
    const { active } = this.props;

    const background = isBrowser ? (<Grid cellSize={10} />) : null;

    const className = classNames(styles.content, {
      [styles.active]: active,
      [styles.inactive]: !active,
    });

    return (
      <div className={className}>
        <h1>MasterMade</h1>
        { background }
        <Link to="/">&nbsp;</Link>
      </div>
    );
  }
}
