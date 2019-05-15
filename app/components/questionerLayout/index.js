import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
//import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    // ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 11,
    // paddingBottom: theme.spacing.unit * 2,
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
    padding: theme.spacing.unit * 8,

  },
  stepper: {
    width: theme.spacing.unit * 33,
    height: theme.spacing.unit * 10,
    marginLeft: -theme.spacing.unit * 16,
    borderRadius: theme.spacing.unit / 2,
    backgroundColor: 'green',
    color: 'white',
  },
});

function QuestionerLayout({ children, classes, monsterImg, stepNum, totalSteps }) {
  return (
    <div className={classes.root} >
      <img src={monsterImg} className={classes.monsterImg} />
      <Paper className={classes.paper} elevation={1}>
        <div className={classes.stepper} >
          <Typography variant="h6" gutterBottom>
            {`${stepNum} `}
            <FormattedMessage {...messages.from} />
            {` ${totalSteps}`}
          </Typography>
        </div>
        {children}
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
  stepNum: PropTypes.string.isRequired,
  totalSteps: PropTypes.string.isRequired,
};

export default withStyles(styles)(QuestionerLayout);
