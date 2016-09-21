import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Link from 'phenomic/lib/Link';

// Import global CSS before other components and their styles
import './index.global.css';
import styles from './index.css';

import Header from '../Header';
import Footer from '../Footer';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class Layout extends Component {

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

    console.log('context', this.context, this.props);

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
            <div className={styles.home}>MasterMade</div>
            <div className={styles.navigation}>
              <div className={styles.about}>
               <Link to={"/about/"}>About</Link>
              </div>
              <div className={styles.services}>Services</div>
              <div className={styles.portfolio}>Portfolio</div>
            </div>
          </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
