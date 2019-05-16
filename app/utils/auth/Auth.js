import auth0 from 'auth0-js';
import history from '../history';

export default class Auth {
  accessToken;

  idToken;

  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: process.env.AUTH_CONFIG_DOMAIN,
    clientID: process.env.AUTH_CONFIG_CLIENT_ID,
    redirectUri: process.env.AUTH_CONFIG_CALLBACK_URL,
    realm: process.env.AUTH_CONFIG_REALM,
    responseType: 'token id_token',
    scope: 'openid',
    audience: process.env.AUTH_CONFIG_AUDIENCE,
    issuer: process.env.AUTH_CONFIG_ISSUER,
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  async login(email, password, redirectAfterLogin) {
    return new Promise((resolve, reject) => {
      if (redirectAfterLogin) {
        localStorage.setItem('redirectAfterLogin', redirectAfterLogin);
      }
      this.auth0.login({ email, password }, err => {
        if (err) {
          console.log(err);
          alert(`Could not login (${err.error}: ${err.error_description}).`);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.navigateAfterLogin();
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.navigateAfterLogin();
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`,
        );
      }
    });
  }

  navigateAfterLogin() {
    let redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
    if (redirectAfterLogin) {
      Promise.resolve().then(() => {
        localStorage.removeItem('redirectAfterLogin');
      });
    }
    redirectAfterLogin = redirectAfterLogin || '/';
    history.replace(redirectAfterLogin);
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: window.location.origin,
    });

    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const { expiresAt } = this;
    return new Date().getTime() < expiresAt;
  }
}

export const createAuth = () => {
  const auth = new Auth();
  // eslint-disable-next-line no-underscore-dangle
  auth._auth = auth;

  const handler = {
    get(target, phrase) {
      if (phrase === 'clone') {
        return () => new Proxy(target._auth, handler);
      } else {
        return target[phrase];
      }
    },
  };

  return new Proxy(auth, handler);
};
