import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Paper from '@material-ui/core/Paper';
import monster1 from 'images/bespectacledMonster.png';
import monster2 from 'images/blueMonster.png';
import monster3 from 'images/hatMonster.png';
import monster4 from 'images/purpleMonster.png';
import monster5 from 'images/redMonster.png';
import monster6 from 'images/yellowMonster.png';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';

const images = [monster1, monster2, monster3, monster4, monster5, monster6];

const styles = theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
  },
  root: {
    display: 'flex',
    justifyContent: 'start',
    maxWidth: theme.spacing.unit * 206,
  },
  header: {
    flex: 12,
  },
  answers: {
    flex: 12,
  },
  answerItem: {

  },
  monsterImg: {
    flex: 12,
  },
});

class ResultPage extends React.Component {
  constructor(props) {
    super(props);

    this.rndImage = images[Math.round((images.length - 1) * Math.random())];
  }

  async componentDidMount() {
    const { history, questionerConfig, savedAnswers } = this.props;
    if (!questionerConfig || !savedAnswers) {
      //history.replace('/questioner');
    }
  }

  renderAnswers(questionerConfig, savedAnswers, classes) {
    return savedAnswers.map((a, ind) => {

      return (
        <Paper className={classes.answerItem}>

        </Paper>
      );
    });

  }

  render() {
    const { classes, questionerConfig, savedAnswers } = this.props;

    console.log('savedAnswers=',savedAnswers);
    return (
      <Layout className={classes.layout} >
        <Paper className={classes.root} >

        </Paper>
        <Helmet>
          <title>Questioner</title>
          <meta
            name="description"
            content="Result page of Find your monster application"
          />
        </Helmet>
        <div className={classes.header}>
          <FormattedMessage {...messages.header} />
        </div>
        {questionerConfig && savedAnswers && (
          <React.Frame>
            <Paper className={classes.answers}>
              {this.renderAnswers(questionerConfig.steps, savedAnswers, classes)}
            </Paper>
            <Paper>
              <img className={classes.monsterImg} src={this.rndImage} />
            </Paper>
          </React.Frame>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    questioner: {
      questionerConfig,
      savedAnswers: { data: answers } = {},
    } = {},
  } = state;
  return { questionerConfig, answers };
};

ResultPage.propTypes = {
  questionerConfig: PropTypes.shape({
    data: PropTypes.shape({
      steps: PropTypes.array.isRequired,
    }),
    isFetching: PropTypes.bool.isRequired,
  }),
  answers: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const withConnect = connect(mapStateToProps);

export default compose(
  // Put `withReducer` before `withConnect`
  withStyles(styles),
  withConnect,
)(ResultPage);
