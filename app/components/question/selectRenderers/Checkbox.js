import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  formControlLabel: {
    fontSize: '18px!important',
  },
});

function CheckboxQuestion(props) {
  const { multiple, options, value, onChange, classes = {} } = props;
  const handleChange = name => event => {
    if (multiple) {
      onChange({ ...adoptedValue, [name]: event.target.checked });
    } else {
      onChange({ [name]: event.target.checked });
    }
  };
  const adoptedValue = value || {};
  return (
    <FormGroup>
      {options.map(opt => (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!adoptedValue[opt.value]}
              onChange={handleChange(opt.value)}
              value={opt.value}
            />
          }
          label={opt.name}
          key={opt.value}
          classes={{ label: classes.formControlLabel }}
        />
      ))}
    </FormGroup>
  );
}

CheckboxQuestion.propTypes = {
  multiple: PropTypes.bool,
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

export default withStyles(styles)(CheckboxQuestion);
