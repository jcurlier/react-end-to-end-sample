import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { Dashboard, Signin } from '../pages';
import AuthenticatedRoute from './AuthenticatedRoute';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';

export default function Router() {
  return (
    <Switch>
      <NotAuthenticatedRoute path="/signin" component={Signin} />
      <AuthenticatedRoute path="/dashboard" exact component={Dashboard} />
      <Redirect from="/" exact to="/dashboard" />
    </Switch>
  );
}
