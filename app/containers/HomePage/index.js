import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/bootstrapButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default function HomePage(props) {
  const { auth: { auth } } = props;
  const getUri = (auth => () => auth.isAuthenticated() ? '/questioner' : '/login')(auth);
  const onStart = ((getUri, history) => () => {
    history.push(getUri());
  })(getUri, props.history);

  return (
    <React.Fragment>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <Button
        valueMessage={messages.startButton}
        rightIcon={ArrowForward}
        onClick={onStart}
      />
    </React.Fragment>
  );
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
