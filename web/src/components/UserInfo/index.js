import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

import { logout } from '../../actions/users';
import { getToken, getCurrentUser } from '../../selectors/auth';

import Box from '../Box';

class UserInfo extends Component {
  logout() {
    this.props.logout();
  }

  render() {
    const { user: { firstname = '', lastname = '', photo }} = this.props;

    return (
      <Box display="flex" alignItems="center" fontSize={2}>
        <Box p={2}>{firstname} {lastname}</Box>
        <Image src={photo} size="tiny" circular onClick={() => this.logout()} />
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: getCurrentUser(state),
    token: getToken(state),
  };
}

export default connect(mapStateToProps, { logout })(UserInfo);
