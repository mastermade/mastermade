import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Link from 'phenomic/lib/Link';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as _ from 'lodash';

import { playPauseGame } from 'app/actions/gridgame';

// Import global CSS before other components and their styles
import './index.global.css';
import styles from './index.css';

import PageTile from '../PageTile';
import TitleTile from '../TitleTile';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    params: PropTypes.shape({
      splat: PropTypes.string,
    }),
    dispatch: PropTypes.func,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(evt) {
    const { dispatch } = this.props;

    if (evt.charCode === 32 || evt.charCode === 112) {
      dispatch(playPauseGame());
    }
  }

  render() {
    const {
      pkg,
    } = this.context.metadata;

    const activePage = this.props.params.splat;

    const pages = [
      { id: 'about', title: 'About' },
      { id: 'services', title: 'Services' },
      { id: 'portfolio', title: 'Portfolio' },
    ];

    const homeActive = (activePage === '');

    return (
      <MuiThemeProvider>
        <div onKeyPress={this.handleKeyPress} tabIndex="0">
          <Helmet
            meta={[
              {
                name: 'generator',
                content: `${process.env.PHENOMIC_NAME} ${process.env.PHENOMIC_VERSION}`,
              },
              { property: 'og:site_name', content: pkg.name },
              { name: 'twitter:site', content: `@${pkg.twitter}` },
            ]}
            script={[
              { src: 'https://cdn.polyfill.io/v2/polyfill.min.js' },
            ]}
          />

          { /* meta viewport safari/chrome/edge */ }
          <Helmet
            meta={[{
              name: 'viewport', content: 'width=device-width, initial-scale=1',
            }]}
          />
          <style>{ "@-ms-viewport { width: device-width; }" }</style>

          <div className={styles.tilepage}>
            <PageTile id="home" title="MasterMade" link="/" active={homeActive}>
              <TitleTile active={homeActive} />
            </PageTile>
            <div className={classNames(styles.navigation, { [styles.active]: (activePage !== '') })}>
              { _.map(pages, (page) => {
                const isActive = (activePage === page.id);
                const contents = isActive ? this.props.children : null;
                return (<PageTile {...page} active={isActive}>{contents}</PageTile>);
              }) }
            </div>
          </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  (state) => {
    return {};
  }
)(Layout);
