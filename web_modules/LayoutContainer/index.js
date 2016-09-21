import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Link from 'phenomic/lib/Link';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as _ from 'lodash';

// Import global CSS before other components and their styles
import './index.global.css';
import styles from './index.css';

import Header from '../Header';
import Footer from '../Footer';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

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

    return (
      <MuiThemeProvider>
        <div className={styles.tile}>
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
            <div className={styles.home}><Link to={"/"}>MasterMade</Link></div>
            <div className={classNames(styles.navigation, { [styles.active]: (activePage !== '') })}>
              { _.map(pages, (page) => {
                const className = classNames(styles[page.id], {
                  [styles.active]: (activePage === page.id),
                });

                return (
                  <div className={className}>
                    <Link to={`/${page.id}/`}>{ page.title }</Link>
                  </div>
                );
              }) }
            </div>
          </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
