import React from 'react';
import PropTypes from 'prop-types';

import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  control: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  label: {
    fontSize: '18px',
  },
});

function SwitcherQuestion(props) {
  const { options, value, onChange, classes } = props;
  const handleChange = (e, val) => onChange(options[val ? 1 : 0].value);
  const checked = value === options[1].value;
  return (
    <div className={classes.root}>
      <span className={classes.label}>{options[0].name}</span>
      <Switch
        checked={checked}
        onChange={handleChange}
        value={options[1].value}
        color="secondary"
        id="switcher"
        classes={{ root: classes.control }}
      />
      <span className={classes.label}>{options[1].name}</span>
    </div>
  );
}

SwitcherQuestion.propTypes = {
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

export default withStyles(styles)(SwitcherQuestion);
