import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class ResultPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   // this.state = {
  //   //   questions: null,
  //   // };
  // }

  async componentDidMount() {
    // const questions = (await axios.get('http://localhost:8081/')).data;
    // this.setState({
    //   questions,
    // });
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Questioner</title>
          <meta
            name="description"
            content="Result page of Find your monster application"
          />
        </Helmet>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <div className="container">ResultPage</div>
      </React.Fragment>
    );
  }
}

export default ResultPage;
