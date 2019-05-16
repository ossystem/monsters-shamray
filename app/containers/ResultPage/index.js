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
import classNames from 'classnames';

const images = [monster1, monster2, monster3, monster4, monster5, monster6];

const styles = theme => ({
  layout: {},
  root: {
    display: 'flex',
    justifyContent: 'stretch',
    alignContent: 'stretch',
    flexWrap: 'wrap',
    maxWidth: theme.spacing.unit * 206,
    margin: '0 auto',
    paddingTop: theme.spacing.unit * 34,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 0,
    width: '100%',
    fontSize: '68px',
    marginBottom: theme.spacing.unit * 4,
  },
  answers: {
    fontSize: '68px',
    width: theme.spacing.unit * 36,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    border: `1px solid rgb(227, 227, 227)`,
    marginLeft: theme.spacing.unit * 6,
    padding: theme.spacing.unit * 7,
  },
  answerItem: {
    flexShrink: 0,
    border: `2px solid rgb(210, 219, 57)`,
    borderRadius: '50%',
    width: theme.spacing.unit * 16,
    height: theme.spacing.unit * 16,
    fontSize: '18px',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  answerItemTopMargin: {
    marginTop: theme.spacing.unit * 2,
  },
  youAre: {
    width: theme.spacing.unit * 21,
    height: theme.spacing.unit * 10,
    marginLeft: -theme.spacing.unit * 28,
    borderRadius: theme.spacing.unit / 2,
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  youAreSign: {
    color: 'white',
    fontWeight: 600,
    fontSize: '32px',
  },
  monsterImgContainer: {
    width: `calc(100% - ${theme.spacing.unit * 36}px - ${theme.spacing.unit * 6}px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing.unit * 4,
  },
  monsterImg: {
    maxWidth: `calc(100% - ${theme.spacing.unit * 4 * 2}px)`,
    maxHeight: `calc(100% - ${theme.spacing.unit * 4 * 2}px)`,
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

  renderAnswers(questionerConfig, answers, classes) {
    const prepAnswers = [];
    answers.forEach((answer, index) => {
      const { appearance, options } = questionerConfig[index];
      switch (appearance) {
        case 'radio':
        case 'switcher': {
          const option = options.find(opt => opt.value === answer);
          if (option) {
            prepAnswers.push(option.name);
          }
          break;
        }
        case 'checkbox':
          Object.keys(answer).forEach(val => {
            const option = options.find(opt => opt.value === val);
            if (option) {
              prepAnswers.push(option.name);
            }
          });
          break;
        case 'slider':
          prepAnswers.push(answer > 50 ? options[1].name : options[0].name);
          break;
      }
    });
    return prepAnswers.map((str, ind) => (
      <Paper
        className={classNames(classes.answerItem, classes.answerItemTopMargin)}
        key={ind}
        elevation={0}
      >
        {str}
      </Paper>
    ));
  }

  render() {
    const { classes, questionerConfig, savedAnswers } = this.props;

    return (
      <Layout className={classes.layout} >
        <Helmet>
          <title>Questioner</title>
          <meta
            name="description"
            content="Result page of Find your monster application"
          />
        </Helmet>
        <Paper className={classes.root} elevation={0} >
          <div className={classes.header}>
            <FormattedMessage {...messages.header} />
          </div>
          {questionerConfig && savedAnswers && (
            <React.Fragment>
              <Paper className={classes.answers} elevation={5}>
                <Paper className={classes.youAre} elevation={10}>
                  <span className={classes.youAreSign}>
                    <FormattedMessage {...messages.you_are} />
                  </span>
                </Paper>
                {this.renderAnswers(questionerConfig.steps, savedAnswers, classes)}
              </Paper>
              <Paper className={classes.monsterImgContainer} elevation={0}>
                <img className={classes.monsterImg} src={this.rndImage} />
              </Paper>
            </React.Fragment>
          )}
        </Paper>
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
