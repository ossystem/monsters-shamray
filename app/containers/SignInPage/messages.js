import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SignInPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Start by Signup',
  },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: 'Next',
  },
});
