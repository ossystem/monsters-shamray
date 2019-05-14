/*
 *
 * authentication reducer
 *
 */
import produce from 'immer';

import Auth from 'utils/auth/Auth';
import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
} from './constants';

export const initialState = {
  auth: new Auth(),
  isFetching: true,
};

/* eslint-disable default-case, no-param-reassign */
const authenticationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTHENTICATION_REQUEST:
        draft.isFetching = true;
        break;
      case AUTHENTICATION_SUCCESS:
        draft.auth = draft.auth.clone();
        draft.isFetching = false;
        break;
      case AUTHENTICATION_FAILURE:
        draft.isFetching = false;
        break;
    }
  });

export default authenticationReducer;
