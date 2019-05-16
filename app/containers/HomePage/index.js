import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/bootstrapButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { withStyles } from '@material-ui/core';
import startLogoImg from '../../images/start_logo.png';
import allMonstersImg from '../../images/page_1_monsters.png';
import messages from './messages';

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '75px',
  },
  startLogo: {
    margin: '75px 50px 50px',
    width: '850px',
  },
  allMonsters: {
    width: '1150px',
  },
  button: {
    alignSelf: 'center',
    margin: '20px',
  },
};

function HomePage(props) {
  const { auth: { auth }, classes } = props;
  const getUri = (auth => () => auth.isAuthenticated() ? '/questioner' : '/login')(auth);
  const onStart = ((getUri, history) => () => {
    history.push(getUri());
  })(getUri, props.history);

  return (
    <React.Fragment>
      <div className={classes.container}>
        <img className={classes.startLogo} src={startLogoImg} alt="startLogo" />
        <img className={classes.allMonsters} src={allMonstersImg} alt="allMonsters" />
        <Button
          className={classes.button}
          valueMessage={messages.startButton}
          rightIcon={ArrowForward}
          onClick={onStart}
        />
      </div>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
