import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
  root: {
    alignSelf: 'flex-end',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '28px',
    padding: '6px 12px',
    borderRadius: theme.spacing.unit,
    lineHeight: 1.5,
    backgroundColor: '#007bff',
    width: '340px',
    height: theme.spacing.unit * 11,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  icon: {
    fontSize: '38px',
  },
  leftIcon: {
    marginRight: theme.spacing.unit * 11,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit * 11,
  },
  label: {
    color: 'white',
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
    className,
  } = props;

  return (
    <Button
      variant="contained"
      disableRipple
      classes={{ label: classes.label }}
      className={classNames(classes.margin, classes.root, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {LeftIcon && (
        <LeftIcon
          className={classNames(classes.leftIcon, classes.icon)}
          fontSize="inherit"
        />
      )}
      <FormattedMessage {...valueMessage} />
      {RightIcon && (
        <RightIcon
          className={classNames(classes.rightIcon, classes.icon)}
          fontSize="inherit"
        />
      )}
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
  className: PropTypes.string,
};

export default withStyles(styles)(BootstrapButton);
