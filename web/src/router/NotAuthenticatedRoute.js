import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthenticatedRoute from './AuthenticatedRoute';

function DefaultRedirect() {
  return <Redirect to="/dashboard" />;
}

export default function NotAuthenticatedRoute(props) {
  const { component, authenticatedComponent = DefaultRedirect } = props;

  return (
    <AuthenticatedRoute
      {...props}
      notAuthenticatedComponent={component}
      component={authenticatedComponent}
    />
  );
}
