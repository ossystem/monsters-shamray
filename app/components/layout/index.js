import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from 'images/miniLogo.png';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    position: 'relative',
    minWidth: '100%',
  },
  logo: {
    position: 'absolute',
    width: '416px',
    textAlign: 'center',
    top: '72px',
  },
  logoImg: {
    marginBottom: '20px',
    maxWidth: '100%',
  },
  sublabel: {
    fontSize: '24px',
    color: 'rgb(182, 211, 142)',
  },
});

function Layout({ children, classes, className }) {
  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" className={classes.logoImg} />
        <div className={classes.sublabel}>
          <FormattedMessage {...messages.logo} />
        </div>
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
  className: PropTypes.string,
};

export default withStyles(styles)(Layout);
