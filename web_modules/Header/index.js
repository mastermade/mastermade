import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Svg from 'react-svg-inline';

import styles from './index.css';
import twitterSvg from '../icons/iconmonstr-twitter-1.svg';
import gitHubSvg from '../icons/iconmonstr-github-1.svg';

export default class Header extends Component {

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata;

    return null;
  }
}
