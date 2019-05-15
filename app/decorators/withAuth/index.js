import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';
import { connect } from 'react-redux';
import { compose } from 'redux';

function withAuth(Component) {
  function WrappedComponent(props) {
    return <Component {...props} />;
  }

  if (process.env.NODE_ENV !== 'production') {
    WrappedComponent.displayName = `withAuth(${getDisplayName(Component)})`;
  }
  return WrappedComponent;
}

withAuth.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

export default compose(
  connect(mapStateToProps),
  withAuth,
);
