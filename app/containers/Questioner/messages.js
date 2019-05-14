import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Questioner';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Questioner container!',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Submit',
  },
});
