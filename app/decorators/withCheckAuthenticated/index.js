import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import getDisplayName from 'react-display-name';

function withCheckAuthenticated(Component) {
  function WrappedComponent(props) {
    const { auth: { auth, isFetching } } = props;

    if (auth.isAuthenticated()) {
      return <Component {...props} />;
    } else if (isFetching) {
      return null;
    } else {
      const { location } = props;
      if (location) {
        const { pathname, search, hash } = location;
        const redirectAfterLogin = `${pathname}${search}${hash}`;
        localStorage.setItem('redirectAfterLogin', redirectAfterLogin);
      }
      return <Redirect to="login" />;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WrappedComponent.displayName = `withAuth(${getDisplayName(Component)})`;
  }
  return WrappedComponent;
}

withCheckAuthenticated.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default withCheckAuthenticated;
