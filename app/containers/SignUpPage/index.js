import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default function SignUpPage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>SignUpPage</title>
        <meta name="description" content="SignUp page" />
      </Helmet>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </React.Fragment>
  );
}
