import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 11,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
  },
  monsterImg: {
    height: theme.spacing.unit * 37,
    width: theme.spacing.unit * 46,
  },
  paper: {
    width: theme.spacing.unit * 123,
    height: theme.spacing.unit * 90,
    padding: theme.spacing.unit * 7,
  },
  stepper: {
    width: theme.spacing.unit * 33,
    height: theme.spacing.unit * 10,
    marginLeft: -theme.spacing.unit * 16,
    borderRadius: theme.spacing.unit / 2,
    backgroundColor: green[300],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperSign: {
    color: 'white',
    fontWeight: 600,
    fontSize: '32px',
  },
  questionBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'flex-start',
    marginTop: theme.spacing.unit * 13,
  },
});

function QuestionerLayout({ children, classes, monsterImg, stepNum, totalSteps }) {
  return (
    <div className={classes.root} >
      <img src={monsterImg} className={classes.monsterImg} />
      <Paper className={classes.paper} elevation={1}>
        <Paper className={classes.stepper} elevation={10}>
          <span className={classes.stepperSign}>
            {`${stepNum} `}
            <FormattedMessage {...messages.from} />
            {` ${totalSteps}`}
          </span>
        </Paper>
        <Paper className={classes.questionBody} elevation={0}>
          {children}
        </Paper>
      </Paper>
    </div>
  );
}

QuestionerLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  monsterImg: PropTypes.string.isRequired,
  stepNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  totalSteps: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default withStyles(styles)(QuestionerLayout);
