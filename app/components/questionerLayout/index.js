import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 11,
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
  },
  monsterImg: {
    width: theme.spacing.unit * 46,
    maxWidth: '60%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: `min(60%, ${theme.spacing.unit * 46}px)`,
    },
  },
  paper: {
    width: theme.spacing.unit * 123,
    maxWidth: '100%',
    padding: theme.spacing.unit * 7,
  },
  stepper: {
    width: theme.spacing.unit * 33,
    height: theme.spacing.unit * 10,
    marginLeft: -theme.spacing.unit * 7,
    borderRadius: theme.spacing.unit / 2,
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginLeft: -theme.spacing.unit * 10,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: -theme.spacing.unit * 12,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: -theme.spacing.unit * 14,
    },
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

function QuestionerLayout({ children, classes, monsterImg, stepNum, totalSteps, width }) {
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
  stepNum: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(QuestionerLayout);
