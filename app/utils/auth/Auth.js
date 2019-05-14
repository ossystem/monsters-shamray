import auth0 from 'auth0-js';
import history from '../history';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  accessToken;

  idToken;

  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    realm: AUTH_CONFIG.realm,
    responseType: 'token id_token',
    scope: 'openid',
    audience: AUTH_CONFIG.audience,
    issuer: AUTH_CONFIG.issuer,
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.clone = this.clone.bind(this);
  }

  clone() {
    const { accessToken, idToken, expiresAt } = this;
    const auth = new Auth();
    Object.assign(auth, { accessToken, idToken, expiresAt });
    return auth;
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
