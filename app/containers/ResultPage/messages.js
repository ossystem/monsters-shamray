import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ResultPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Excellent, congratulations, you\'re a monster',
  },
  you_are: {
    id: `${scope}.youAre`,
    defaultMessage: 'You\'re',
  },
});
