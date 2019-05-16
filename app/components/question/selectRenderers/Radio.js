import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  formControlLabel: {
    fontSize: '18px!important',
  },
});

function RadioQuestion(props) {
  const { options, value, onChange, classes } = props;
  const handleChange = (event, val) => onChange(val);

  return (
    <RadioGroup
      className={classes.group}
      value={value}
      onChange={handleChange}
    >
      {options.map(opt => (
        <FormControlLabel
          value={opt.value}
          control={<Radio />}
          label={opt.name}
          key={opt.value}
          classes={{ label: classes.formControlLabel }}
        />
      ))}
    </RadioGroup>
  );
}

RadioQuestion.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioQuestion);
