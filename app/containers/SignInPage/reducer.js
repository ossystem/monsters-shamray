/*
 *
 * authentication reducer
 *
 */
import produce from 'immer';

import { createAuth } from 'utils/auth/Auth';
import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  STOP_FETCHING,
} from './constants';

export const initialState = {
  auth: createAuth(),
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
      case STOP_FETCHING:
        draft.isFetching = false;
        break;
    }
  });

export default authenticationReducer;
