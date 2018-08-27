import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import InviteContributorModal from './InviteContributorModal';
import { Box } from '../../../components';

export default class InviteContributorButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inviteOpen: false,
    };
  }

  handleOpen() {
    this.setState({
      inviteOpen: true,
    });
  }

  handleClose() {
    this.setState({
      inviteOpen: false,
    });
  }

  render() {
    return (
      <Box m={4}>
        <InviteContributorModal
          closeModal={() => this.handleClose()}
          open={this.state.inviteOpen}
        />
        <Button primary size="large" onClick={() => this.handleOpen()}>
          <Icon name="address book" />
          Invite a new contributor
        </Button>
      </Box>
    );
  }
}
