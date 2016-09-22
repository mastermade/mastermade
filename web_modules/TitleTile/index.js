import React, { Component, PropTypes } from 'react';
import Link from 'phenomic/lib/Link';
import classNames from 'classnames';

import styles from './style.scss';

import Grid from '../gridgame/Grid';

export default class TitleTile extends Component {
  static propTypes = {
    active: PropTypes.bool,
  };

  render() {
    const { active } = this.props;

    const className = classNames(styles.content, {
      [styles.active]: active,
    });

    return (
      <div className={className}>
        <h1>MasterMade</h1>
        <Grid />
      </div>
    );
  }
}
