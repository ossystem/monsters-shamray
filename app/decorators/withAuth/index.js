import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';
import { connect } from 'react-redux';
import { compose } from 'redux';
//import * as actions from '../redux/actions';


function withAuth(Component) {
  class WrappedComponent extends React.Component {
    render() {
      return (
        <Component {...this.props} />
      );
    }
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
