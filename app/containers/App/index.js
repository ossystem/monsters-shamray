/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from 'containers/HomePage';
import SignIn from 'containers/SignInPage';
import Callback from 'containers/Callback';
import Questioner from 'containers/Questioner/Loadable';
import Result from 'containers/ResultPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Helmet } from 'react-helmet';
import withAuth from 'decorators/withAuth';
import withCheckAuthenticated from 'decorators/withCheckAuthenticated';
import { authenticationAction, stopFetching } from 'containers/SignInPage/actions';

const HomePage = withAuth(Home);
const SignInPage = withAuth(SignIn);
const QuestionerPage = withAuth(withCheckAuthenticated(Questioner));
const ResultPage = withAuth(withCheckAuthenticated(Result));

import GlobalStyle from '../../global-styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const handleAuthentication = ({ location, auth }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends React.Component {
  componentDidMount() {
    const { renewSession, stopFetching } = this.props;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    } else {
      stopFetching();
    }
  }

  render() {
    const { auth } = this.props;

    return (
      <div>
        <Helmet
          titleTemplate="%s - Find your monster"
          defaultTitle="Find your monster"
        >
          <meta name="description" content="Find your monster - A React.js application" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/login"
            render={props =>
              auth.auth.isAuthenticated() ? (
                <Redirect to="/" />
              ) : (
                <SignInPage {...props} />
              )
            }
          />
          <Route path="/questioner" component={QuestionerPage} />
          <Route path="/result" component={ResultPage} />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication({ location: props.location, auth: auth.auth });
              return <Callback {...props} />;
            }}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    );
  }
}

App.propTypes = {
  locale: PropTypes.string,
  auth: PropTypes.object.isRequired,
  renewSession: PropTypes.func.isRequired,
  stopFetching: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  stopFetching: () => dispatch(stopFetching()),
  ...bindActionCreators(
    {
      renewSession() {
        const { auth: { auth } } = ownProps;
        return authenticationAction(() => auth.renewSession());
      },
    },
    dispatch,
  ),
});

export default withAuth(
  connect(
    undefined,
    mapDispatchToProps,
  )(App),
);
