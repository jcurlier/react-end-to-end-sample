import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Box, HorizontalCarousel, Loader, Message } from '../../../components';
import { listContributors, unlinkContributor } from '../../../actions/contributors';
import { getToken } from '../../../selectors/auth';

class ContributorsCarousel extends Component {
  componentDidMount() {
    const { loading, loaded } = this.props;

    if (!loading && !loaded) {
      return this.props.listContributors();
    }

    return null;
  }

  handleItemDelete(id) {
    this.props.unlinkContributor({
      token: this.props.token,
      contributorId: id,
    });
  }

  render() {
    const {
      loading,
      loaded,
      error,
      data: contributors,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <Message.ErrorMessage />
      );
    }

    if (loaded && contributors) {
      if (contributors.length === 0) {
        return (
          <Message.NoDataMessage />
        );
      }

      const carouselData = contributors.map(contributor => {
        const {
          id,
          firstname,
          lastname,
          photo
        } = contributor;

        return {
          id,
          name: `${firstname} ${lastname}`,
          image: photo,
        };
      });

      return (
        <Box mt={4}>
          <Box mt={2}>
            <HorizontalCarousel
              items={carouselData}
              itemDelete={(id) => this.handleItemDelete(id)}
            />
          </Box>
        </Box>
      );
    }

    return null;
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.contributors.loaded,
    loading: state.contributors.loading,
    data: state.contributors.data,
    error: state.contributors.error,
    token: getToken(state),
  };
}

export default connect(
  mapStateToProps,
  { listContributors, unlinkContributor }
)(ContributorsCarousel);
