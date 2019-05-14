import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

function SwitcherQuestion(props) {
  const { options, value, onChange, classes = {} } = props;
  const handleChange = (e, val) => onChange(options[val ? 1 : 0].value);
  const checked = value === options[1].value;
  return (
    <React.Fragment>
      <Typography variant="h8" gutterBottom>{options[0].name}</Typography>
      <Switch
        checked={checked}
        onChange={handleChange}
        value={options[1].value}
        color="primary"
        id="switcher"
      />
      <Typography variant="h8" gutterBottom>{options[1].name}</Typography>
    </React.Fragment>
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
};

export default SwitcherQuestion;
