import React, { Component, PropTypes } from 'react';
import { BodyContainer } from 'phenomic';

import Page from '../Page';

class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const { body } = this.props;

    return (
      <Page {...this.props}>
        <BodyContainer>{ body }</BodyContainer>
      </Page>
    );
  }
}

Homepage.propTypes = {
  body: PropTypes.string.isRequired,
};

export default Homepage;
