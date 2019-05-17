import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from 'images/miniLogo.png';
import mobStartLogoImg from 'images/mob_start_logo.png';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    position: 'relative',
    minWidth: '100%',
    maxWidth: '100%',
    padding: `0px ${theme.spacing.unit}px  ${theme.spacing.unit * 6}px ${theme.spacing.unit}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing.unit * 2}px`,
      paddingBottom: theme.spacing.unit * 10,
    },
  },
  logo: {
    margin: `${theme.spacing.unit * 5}px`,
    marginBottom: '0px',
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      width: theme.spacing.unit * 36,
      margin: 0,
      top: theme.spacing.unit,
    },
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      width: theme.spacing.unit * 44,
      margin: 0,
      top: theme.spacing.unit * 6,
    },
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      width: theme.spacing.unit * 52,
      margin: 0,
      top: theme.spacing.unit * 9,
    },
    textAlign: 'center',
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

function Layout({ children, classes, className, history, width }) {
  const onHomePage = () => history.push('/');
  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.logo} onClick={onHomePage} >
        <img
          src={width === 'xs' ? mobStartLogoImg : logo}
          alt="logo"
          className={classes.logoImg}
        />
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
  history: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(Layout);
