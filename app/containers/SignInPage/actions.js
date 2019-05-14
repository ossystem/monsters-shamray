/*
 *
 * authentication actions
 *
 */

import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE
} from './constants';

export function authenticationAction(action) {
  return dispatch => {
    if (action.then) {
      dispatch({ type: AUTHENTICATION_REQUEST });
    }
    try {
      action();
      return dispatch({ type: AUTHENTICATION_SUCCESS });
    } catch (e) {
      return dispatch({ type: AUTHENTICATION_FAILURE });
    }
  }
}
