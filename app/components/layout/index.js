import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from 'images/miniLogo.png';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
  root: {
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    width: '416px',
    top: '72px',
  },
  logoImg: {
    maxWidth: '100%',
  },
});

function Layout({ children, classes }) {
  return (
    <div className={classes.root} >
      <div className={classes.logo} >
        <img src={logo} alt="logo" className={classes.logoImg} />
        <FormattedMessage {...messages.logo} />
      </div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
