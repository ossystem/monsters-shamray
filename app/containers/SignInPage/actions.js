/*
 *
 * authentication actions
 *
 */

import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  STOP_FETCHING,
} from './constants';

export function authenticationAction(action) {
  return dispatch => {
    dispatch({ type: AUTHENTICATION_REQUEST });
    try {
      action();
      return dispatch({ type: AUTHENTICATION_SUCCESS });
    } catch (e) {
      return dispatch({ type: AUTHENTICATION_FAILURE });
    }
  };
}

export function stopFetching() {
  return { type: STOP_FETCHING };
}
