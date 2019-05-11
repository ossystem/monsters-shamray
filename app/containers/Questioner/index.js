import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Questioner extends React.Component {
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

export default Questioner;
