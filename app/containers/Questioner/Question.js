import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

const classes = {};

function renderQuestionBody(config, value, onChange) {
  const { multiple = false, type, appearance, options } = config;

  let result = null;
  switch (type) {
    case 'select': {
      result = renderSelect({ multiple, options, appearance, value, onChange });
      break;
    }
  }

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      {result}
    </FormControl>
  );
}

function renderSelect({
  multiple,
  options,
  appearance,
  value,
  onChange,
  name,
  ariaLabel,
}) {
  let result = null;
  switch (appearance) {
    case 'checkbox': {
      const adoptedValue = value || {};

      const handleChange = name => event => {
        if (multiple) {
          onChange({ ...adoptedValue, [name]: event.target.checked });
        } else {
          onChange({ [name]: event.target.checked });
        }
      };

      result = (
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
            />
          ))}
        </FormGroup>
      );
      break;
    }
    case 'radio': {
      const handleChange = (event, val) => onChange(val);
      result = (
        <RadioGroup
          aria-label={ariaLabel}
          name={name}
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
            />
          ))}
        </RadioGroup>
      );
      break;
    }
    case 'switcher': {
      const handleChange = (event, val) => {
        onChange(options[val ? 1 : 0].value);
      }
      const checked = value === options[1].value;
      result = (
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
      break;
    }
    case 'slider': {
      // result =
      break;
    }
  }
  return result;
}

// const selectRenderers = {
//   checkbox: renderCheckboxQuestion,
//   switcher: renderSwitcherQuestion,
//   slider: renderSliderQuestion,
// };
//
// function renderCheckboxQuestion({multiple, options, appearance, value, onChange}) {
//
// }
//
// function renderCheckboxQuestion({multiple, options, appearance, value, onChange}) {
//
// }

export default function Question({ config, onChange, id, value }) {
  const { question } = config;
  const onAnswer = (...rest) => onChange(id, ...rest);
  return (
    <React.Fragment>
      <Typography variant="h1" gutterBottom>
        {question}
      </Typography>
      {renderQuestionBody(config, value, onAnswer)}
    </React.Fragment>
  );
}

Question.propTypes = {
  config: PropTypes.shape({
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    appearance: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ),
  }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};
