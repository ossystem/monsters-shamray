import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import QuestionerLayout from 'components/questionerLayout';
import Layout from 'components/layout';
import Button from 'components/bootstrapButton';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';
import messages from './messages';
import { authenticationAction } from 'containers/SignInPage/actions';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import monsterImg from 'images/redMonster.png';

const styles = theme => ({
  root: {
    // ...theme.mixins.gutters(),
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,
  },
  header: {
    fontSize: '68px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: theme.spacing.unit * 5,
  },
  formControl: {
    width: theme.spacing.unit * 42,
  },
  formControlUnderline: {},
  formButton: {
    alignSelf: 'flex-end',
    marginTop: theme.spacing.unit * 4,
  },
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
    const { email, password, emailError, passwordError, history } = this.state;
    const { classes } = this.props;
    const disabled = this.isFormSubmitionDisabled({ email, password, emailError, passwordError });

    return (
      <Layout history={history}>
        <Helmet>
          <title>SignInPage</title>
          <meta name="description" content="SignIn page" />
        </Helmet>
        <QuestionerLayout monsterImg={monsterImg} stepNum="1" totalSteps="5" >
          <div className={classes.header} >
            <FormattedMessage {...messages.header} />
          </div>
          <form
            onSubmit={this.onSubmit}
            className={classes.form}
            ref={this.formRef}
          >
            <FormControl
              className={classes.formControl}
              error={!!emailError}
              classes={{ underline: classes.formControlUnderline }}
            >
              <InputLabel htmlFor="email">Your Email</InputLabel>
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
              className={classes.formButton}
            />
          </form>
        </QuestionerLayout>
      </Layout>
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
