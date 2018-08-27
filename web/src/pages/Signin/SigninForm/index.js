import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Icon } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';

import { signin } from '../../../actions/users';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username is Required';
  }

  if (!values.password) {
    errors.password = 'Password is Required';
  }
  return errors;
};

class SigninForm extends Component {
  submit(values) {
    this.props.signin(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit((values) => this.submit(values))}>
        <Field
          name="email"
          component={LabelInputField}
          label={{ content: <Icon color="blue" name="user" size="large" /> }}
          labelPosition="left"
          placeholder="Email"
        />
        <Field
          name="password"
          component={LabelInputField}
          type="password"
          label={{ content: <Icon color="blue" name="lock" size="large" /> }}
          labelPosition="left"
          placeholder="Password"
        />
        <Form.Field
          control={Button}
          primary
          className="submit-btn"
          type="submit"
        >
          Login
        </Form.Field>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
  form: 'signinForm',
  validation: validate,
})(SigninForm);

export default connect(mapStateToProps, { signin })(reduxFormSignin);
