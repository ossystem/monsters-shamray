import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

function SliderQuestion(props) {
  const { options, value, onChange, classes = {} } = props;
  const handleChange = (e, val) => onChange(val);
  return (
    <React.Fragment>
      <Typography id="labelLeft" variant="h8">
        {options[0].name}
      </Typography>
      <Slider
        classes={{ container: classes.slider }}
        value={value}
        onChange={handleChange}
      />
      <Typography id="labelRight" variant="h8">
        {options[1].name}
      </Typography>
    </React.Fragment>
  );
}

SliderQuestion.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
};

export default SliderQuestion;
