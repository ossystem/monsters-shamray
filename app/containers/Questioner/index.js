import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import api from 'api';
import messages from './messages';
import * as actionsTypes from './constants';

class Questioner extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   // this.state = {
  //   //   questions: null,
  //   // };
  // }

  componentDidMount() {
    this.props.getQuestionerConfig();
  }

  render() {
    return (
      <div className="questioner">
        <Helmet>
          <title>Questioner</title>
          <meta
            name="description"
            content="Questioner page of Find your monster application"
          />
        </Helmet>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    questioner: {
      questionerConfig,
      savedAnswers: { isFetching: answersSavingInProgress },
    },
  } = state;
  return { questionerConfig, answersSavingInProgress };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  bindActionCreators(
    {
      getQuestionerConfig() {
        return dispatch => {
          const accessToken = ownProps.auth.getAccessToken();
          dispatch({ type: actionsTypes.QUESTIONER_CONFIG_REQUEST });
          return api.getQuestionerConfig(accessToken)
            .then(response => {
              dispatch({
                type: actionsTypes.QUESTIONER_CONFIG_SUCCESS,
                data: response,
              });
            })
            .catch(error => {
              dispatch({
                type: actionsTypes.QUESTIONER_CONFIG_FAILURE,
                data: error,
              });
            });
        };
      },
      saveAnswers(...ars) {
        return dispatch => {
          const accessToken = ownProps.auth.getAccessToken();
          dispatch({ type: actionsTypes.SAVE_ANSWERS_REQUEST });
          return api.saveAnswers(accessToken, ...ars)
            .then(response => {
              dispatch({
                type: actionsTypes.SAVE_ANSWERS_SUCCESS,
                data: response,
              });
            })
            .catch(error => {
              dispatch({
                type: actionsTypes.SAVE_ANSWERS_FAILURE,
                data: error,
              });
            });
        };
      },
    },
    dispatch,
  )
);

Questioner.propTypes = {
  auth: PropTypes.object.isRequired,
  questionerConfig: PropTypes.shape({
    data: PropTypes.shape({
      steps: PropTypes.array.isRequired,
    }),
    isFetching: PropTypes.bool.isRequired,
  }),
  answersSavingInProgress: PropTypes.bool.isRequired,
  saveAnswers: PropTypes.func.isRequired,
  getQuestionerConfig: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'questioner', reducer });

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withConnect,
)(Questioner);
