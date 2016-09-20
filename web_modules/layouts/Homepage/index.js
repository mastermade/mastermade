import React, { Component, PropTypes } from 'react';
import { BodyContainer } from 'phenomic';
import { connect } from 'react-redux';

import Page from '../Page';
import Grid from '../../gridgame/Grid';

class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const { body } = this.props;

    console.log('props', this.props);

    return (
      <Page {...this.props}>
        <BodyContainer>{ body }</BodyContainer>
        <Grid />
      </Page>
    );
  }
}

Homepage.propTypes = {
  body: PropTypes.string.isRequired,
};

export default connect(
  (state) => {
    return {
      visibility: state.visibility,
    };
  }
)(Homepage);
