import React, { Component, PropTypes } from 'react';
import Link from 'phenomic/lib/Link';
import classNames from 'classnames';

import styles from './style.scss';

export default class PageTile extends Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  };

  render() {
    const { id, title, active, link, children } = this.props;

    const className = classNames(styles[id], {
      [styles.active]: active,
    });

    const to = link || `/${id}/`;

    const contents = children || (<Link className={styles.pagelink} to={to}>{ title }</Link>);

    return (
      <div className={className}>
        { contents }
      </div>
    );
  }
}
