import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/bootstrapButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import startLogoImg from '../../images/start_logo.png';
import allMonstersImg from '../../images/page_1_monsters.png';
import mobStartLogoImg from '../../images/mob_start_logo.png';
import mobAllMonstersImg from '../../images/mob_page_1_monsters.png';
import { compose } from 'redux';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '100%',
    padding: `0px ${theme.spacing.unit}px  ${theme.spacing.unit * 6}px ${theme.spacing.unit}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing.unit * 2}px`,
      paddingBottom: theme.spacing.unit * 10,
    },
  },
  startLogo: {
    maxWidth: '100%',
    margin: `${theme.spacing.unit * 5}px`,
    marginBottom: '0px',
    [theme.breakpoints.up('sm')]: {
      margin: `${theme.spacing.unit * 9}px ${theme.spacing.unit * 6}px 0 ${theme.spacing.unit * 6}px`,
      width: '850px',
    },
  },
  logoSign: {
    marginTop: `${theme.spacing.unit * 2}px`,
    color: 'rgb(182, 211, 142)',
    fontSize: '24px',
    [theme.breakpoints.up('sm')]: {
      marginTop: `${theme.spacing.unit * 5}px`,
      fontSize: '38px',
    },
  },
  allMonsters: {
    maxWidth: '100%',
    width: '100%',
    marginTop: `${theme.spacing.unit * 3}px`,
    marginLeft: `${theme.spacing.unit * 2}px`,
    marginRight: `${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      marginTop: `${theme.spacing.unit * 5}px`,
      marginLeft: `${theme.spacing.unit * 5}px`,
      marginRight: `${theme.spacing.unit * 5}px`,
      width: '100%',
      maxWidth: theme.spacing.unit * 145,
    },
  },
  button: {
    alignSelf: 'center',
    marginTop: '20px',
  },
});

function HomePage(props) {
  const { auth: { auth }, classes, width } = props;
  const getUri = (auth => () => auth.isAuthenticated() ? '/questioner' : '/login')(auth);
  const onStart = ((getUri, history) => () => {
    history.push(getUri());
  })(getUri, props.history);

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Hidden smUp>
          <img className={classes.startLogo} src={mobStartLogoImg} alt="startLogo" />
        </Hidden>
        <Hidden xsDown >
          <img className={classes.startLogo} src={startLogoImg} alt="startLogo" />
        </Hidden>
        <Paper className={classes.logoSign} elevation={0} >
          <FormattedMessage {...messages.header} />
        </Paper>
        <Hidden smUp>
          <img className={classes.allMonsters} src={mobAllMonstersImg} alt="allMonsters" />
        </Hidden>
        <Hidden xsDown >
          <img className={classes.allMonsters} src={allMonstersImg} alt="allMonsters" />
        </Hidden>
        <Button
          className={classes.button}
          valueMessage={messages.startButton}
          rightIcon={ArrowForward}
          onClick={onStart}
          fullWidth={width === 'xs'}
        />
      </div>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(HomePage);
