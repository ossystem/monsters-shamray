import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Layout from 'components/layout';
import Button from 'components/bootstrapButton';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import messages from './messages';
import { authenticationAction } from 'containers/SignInPage/actions';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

const styles = theme => ({
  root: {
    // ...theme.mixins.gutters(),
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,
  },
  form: {},
  formControl: {},
});

class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  }

  isValid({ email, password }) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let valid = true;
    let emailError = '';
    let passwordError = '';
    if (!emailRegexp.test(email)) {
      valid = false;
      emailError = 'invalid email';
    }
    if (!password) {
      valid = false;
      passwordError = 'password is required';
    }
    return { valid, errors: { emailError, passwordError } };
  }

  handleChange = event => {
    const { auth: { isFetching } } = this.props;
    if (isFetching) return;
    const { id, value } = event.target;
    this.setState({ [id]: value, [`${id}Error`]: '' });
  }

  onInputKeyPress = e => {
    if (e.key === 'Enter' && this.isFormSubmitionDisabled(this.state)) {
      this.formRef.current.submit();
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { state, isValid, props } = this;
    const { email, password } = state;
    const { login, auth: { isFetching } } = props;
    if (isFetching) return;
    const { valid, errors: validationErrors } = isValid({ email, password });
    if (valid) {
      login(email, password);
      this.setState({ emailError: '', passwordError: '' });
    } else {
      const { emailError, passwordError } = validationErrors;
      this.setState({ emailError, passwordError });
    }
  }

  isFormSubmitionDisabled({ email, password, emailError, passwordError }) {
    return !!(emailError || passwordError || !email || !password);
  }

  render() {
    const { email, password, emailError, passwordError } = this.state;
    const { classes } = this.props;
    const disabled = this.isFormSubmitionDisabled({ email, password, emailError, passwordError });

    return (
      <React.Fragment>
        <Helmet>
          <title>SignInPage</title>
          <meta name="description" content="SignIn page" />
        </Helmet>
        <Layout>
          <Typography variant="h1" gutterBottom>
            <FormattedMessage {...messages.header} />
          </Typography>
          <form
            onSubmit={this.onSubmit}
            className={classes.form}
            ref={this.formRef}
          >
            <FormControl
              className={classes.formControl}
              error={!!emailError}
              fullWidth
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                value={email}
                onChange={this.handleChange}
                onKeyPress={this.onInputKeyPress}
                aria-describedby="email-error-text"
              />
              <FormHelperText id="email-error-text">
                {emailError}
              </FormHelperText>
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={!!passwordError}
              fullWidth
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={this.handleChange}
                onKeyPress={this.onInputKeyPress}
                aria-describedby="password-error-text"
              />
              <FormHelperText id="password-error-text">
                {passwordError}
              </FormHelperText>
            </FormControl>
            <Button
              disabled={disabled}
              valueMessage={messages.submitButton}
              rightIcon={ArrowForward}
              type="submit"
            />
          </form>
        </Layout>
      </React.Fragment>
    );
  }
}

SignInPage.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => (
  bindActionCreators(
    {
      login(email, password) {
        const { auth: { auth } } = ownProps;
        return authenticationAction(() => auth.login(email, password, '/questioner'));
      },
    },
    dispatch,
  )
);

const withConnect = connect(
  undefined,
  mapDispatchToProps,
);

export default compose(
  // Put `withReducer` before `withConnect`
  withStyles(styles),
  withConnect,
)(SignInPage);
