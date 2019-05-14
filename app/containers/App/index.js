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

import HomePage from 'containers/HomePage';
import SignInPage from 'containers/SignInPage';
import Callback from 'containers/Callback';
import Questioner from 'containers/Questioner/Loadable';
import ResultPage from 'containers/ResultPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Helmet } from 'react-helmet';

import GlobalStyle from '../../global-styles';

const handleAuthentication = ({ location, auth }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends React.Component {
  // goTo(route) {
  //   this.props.history.replace(`/${route}`);
  // }
  //
  // login() {
  //   this.props.auth.login();
  // }
  //
  // logout() {
  //   this.props.auth.logout();
  // }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    // const { isAuthenticated, userHasScopes } = this.props.auth;
    const { auth } = this.props;

    const withCheckAuthenticated = Component => props => (
      !auth.isAuthenticated() ? (
        <Redirect to="login" />
      ) : (
        <Component auth={auth} {...props} />
      )
    );

    return (
      <div>
        <Helmet
          titleTemplate="%s - Find your monster"
          defaultTitle="Find your monster"
        >
          <meta name="description" content="Find your monster - A React.js application" />
        </Helmet>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <HomePage auth={auth} {...props} />}
          />
          <Route
            path="/login"
            render={props =>
              auth.isAuthenticated() ? (
                <Redirect to="/" />
              ) : (
                <SignInPage auth={auth} {...props} />
              )
            }
          />
          <Route
            path="/questioner"
            render={withCheckAuthenticated(Questioner)}
          />
          <Route path="/result" render={withCheckAuthenticated(ResultPage)} />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication({ location: props.location, auth });
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
};

export default App;
