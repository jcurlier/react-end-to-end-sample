import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { LabelInputField } from 'react-semantic-redux-form';

import { Box } from '../../../components';
import { invite } from '../../../actions/users';
import { getToken } from '../../../selectors/auth';

class InviteContributorModal extends React.Component {
  submit(values) {
    const { token } = this.props;
    this.props.invite({ email: values.email, token });
    this.props.closeModal();
  }

  render() {
    const {
      closeModal,
      open,
      handleSubmit,
    } = this.props;

    return (
      <Modal open={open} size="tiny">
        <Modal.Header>
          INVITE...
          <Button icon floated="right" onClick={() => closeModal()}>
            <Icon name="x" />
          </Button>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            We will send an email invite for you.
          </Modal.Description>
          <Box pt={4}>
            <Form onSubmit={handleSubmit((values) => this.submit(values))}>
              <Field
                name="email"
                component={LabelInputField}
                label={{ content: <Icon color="blue" name="user" size="large" /> }}
                labelPosition="left"
                placeholder="Email"
              />
              <Form.Field
                control={Button}
                primary
                className="submit-btn"
                type="submit"
              >
                Invite
              </Form.Field>
            </Form>
          </Box>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: getToken(state),
  };
}

const reduxFormInvite = reduxForm({
  form: 'inviteForm',
})(InviteContributorModal);

export default connect(mapStateToProps, { invite })(reduxFormInvite);
