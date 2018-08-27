import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// App
import {
  isAuthenticated as isAuthenticatedSelector,
  isAuthLoading as isAuthLoadingSelector,
} from '../selectors/auth';

function DefaultRedirect(props) {
  return (
    <Redirect to={{ pathname: '/signin', state: { from: props.location }}} />
  );
}

class AuthenticatedRoute extends React.Component {
  defaultAuthTest(props) {
    return !!props.isAuthenticated;
  }

  render() {
    const {
      isAuthLoading,
      isAuthenticated,
      component: Component,
      notAuthenticatedComponent: NotAuthenticatedComponent = DefaultRedirect,
      authTest = (props) => this.defaultAuthTest(props),
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          if (isAuthLoading) {
            return <div>Loading...</div>;
          } else if (authTest({ isAuthenticated })) {
            return (
              <Component
                {...props}
              />
            );
          }

          return (
            <NotAuthenticatedComponent {...props} />
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticatedSelector(state),
  isAuthLoading: isAuthLoadingSelector(state),
});

export default connect(mapStateToProps)(AuthenticatedRoute);
