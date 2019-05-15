/*
 *
 * authentication actions
 *
 */

import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
} from './constants';

export default function authenticationAction(action) {
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
