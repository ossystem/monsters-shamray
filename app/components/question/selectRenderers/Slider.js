import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  controlRoot: {
    width: theme.spacing.unit * 18,
  },
  controlContainer: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  controlThumb: {
    backgroundColor: theme.palette.secondary.main,
  },
  controlTrack: {
    backgroundColor: theme.palette.secondary.light,
  },
  label: {
    fontSize: '18px',
  },
});

function SliderQuestion(props) {
  const { options, value, onChange, classes } = props;
  const handleChange = (e, val) => onChange(val);
  return (
    <div className={classes.root}>
      <span className={classes.label}>{options[0].name}</span>
      <Slider
        classes={{
          root: classes.controlRoot,
          container: classes.controlContainer,
          thumb: classes.controlThumb,
          track: classes.controlTrack,
        }}
        value={value}
        onChange={handleChange}
      />
      <span className={classes.label}>{options[1].name}</span>
    </div>
  );
}

SliderQuestion.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SliderQuestion);
