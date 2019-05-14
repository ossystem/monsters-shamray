import produce from 'immer';
import { combineReducers } from 'redux';
import {
  QUESTIONER_CONFIG_REQUEST, QUESTIONER_CONFIG_SUCCESS, QUESTIONER_CONFIG_FAILURE,
  SAVE_ANSWERS_REQUEST, SAVE_ANSWERS_SUCCESS, SAVE_ANSWERS_FAILURE,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const questionerConfigReducer = (state = { isFetching: false }, action) =>
  produce(state, draft => {
    switch (action.type) {
      case QUESTIONER_CONFIG_REQUEST:
        draft.isFetching = true;
        break;
      case QUESTIONER_CONFIG_SUCCESS:
        draft.isFetching = false;
        draft.data = action.data;
        break;
      case QUESTIONER_CONFIG_FAILURE:
        draft.isFetching = false;
        break;
    }
  });

const savedAnswersReducer = (state = { isFetching: false }, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_ANSWERS_REQUEST:
        draft.isFetching = true;
        break;
      case SAVE_ANSWERS_SUCCESS:
        draft.isFetching = false;
        draft.data = action.data;
        break;
      case SAVE_ANSWERS_FAILURE:
        draft.isFetching = false;
        break;
    }
  });

const questionerReducer = combineReducers({
  questionerConfig: questionerConfigReducer,
  savedAnswers: savedAnswersReducer,
});

export default questionerReducer;
