import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import monster1 from 'images/bespectacledMonster.png';
import monster2 from 'images/blueMonster.png';
import monster3 from 'images/hatMonster.png';
import monster4 from 'images/purpleMonster.png';
import monster5 from 'images/redMonster.png';
import monster6 from 'images/yellowMonster.png';

const images = [monster1, monster2, monster3, monster4, monster5, monster6];

class ResultPage extends React.Component {
  async componentDidMount() {
    const { history, questionerConfig, savedAnswers } = this.props;
    if (!questionerConfig || !savedAnswers) {
      //history.replace('/questioner');
    }
  }

  render() {
    const rndImage = images[Math.round((images.length - 1) * Math.random())];
    return (
      <React.Fragment>
        <Helmet>
          <title>Questioner</title>
          <meta
            name="description"
            content="Result page of Find your monster application"
          />
        </Helmet>
        <Typography variant="h1" gutterBottom>
          {<FormattedMessage {...messages.header} />}
        </Typography>

        <img className="container" src={rndImage} />
      </React.Fragment>
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
};

export default connect(
  mapStateToProps,
)(ResultPage);
