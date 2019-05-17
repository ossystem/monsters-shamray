import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core';
import CheckboxQuestion from './selectRenderers/Checkbox';
import RadioQuestion from './selectRenderers/Radio';
import SwitcherQuestion from './selectRenderers/Switcher';
import SliderQuestion from './selectRenderers/Slider';

function renderQuestionBody({ config, value, onChange, classes }) {
  const { multiple = false, type, appearance, options } = config;

  let result = null;
  switch (type) {
    case 'select': {
      result = renderSelect({ multiple, options, appearance, value, onChange });
      break;
    }
  }

  return (
    <FormControl component="fieldset" className={classes.formControl} fullWidth>
      {result}
    </FormControl>
  );
}

function renderSelect({ multiple, options, appearance, value, onChange }) {
  let result = null;
  switch (appearance) {
    case 'checkbox': {
      const props = { multiple, options, value, onChange };
      result = <CheckboxQuestion {...props} />;
      break;
    }
    case 'radio': {
      const props = { options, value, onChange };
      result = <RadioQuestion {...props} />;
      break;
    }
    case 'switcher': {
      const props = { options, value, onChange };
      result = <SwitcherQuestion {...props} />;
      break;
    }
    case 'slider': {
      const props = { options, value, onChange };
      result = <SliderQuestion {...props} />;
      break;
    }
  }
  return result;
}

const styles = theme => ({
  root: {
    position: 'relative',
  },
  question: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '68px',
    },
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'flex-start',
    marginTop: theme.spacing.unit * 5,
  },
});

function Question({ config, onChange, id, value, classes }) {
  const { question } = config;
  const onAnswer = (...rest) => onChange(id, ...rest);
  return (
    <React.Fragment>
      <div className={classes.question}>{question}</div>
      {renderQuestionBody({ config, value, onChange: onAnswer, classes })}
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Question);
