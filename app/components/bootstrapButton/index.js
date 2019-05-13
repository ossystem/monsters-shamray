import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  margin: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

function BootstrapButton(props) {
  const {
    classes,
    disabled,
    onClick,
    valueMessage,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    type,
  } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      disableRipple
      className={classNames(classes.margin, classes.root)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {LeftIcon && <LeftIcon className={classes.leftIcon} />}
      <FormattedMessage {...valueMessage} />
      {RightIcon && <RightIcon className={classes.rightIcon} />}
    </Button>
  );
}

BootstrapButton.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  valueMessage: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }),
  leftIcon: PropTypes.func,
  rightIcon: PropTypes.func,
  type: PropTypes.string,
};

export default withStyles(styles)(BootstrapButton);
