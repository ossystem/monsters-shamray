import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import SignUpPage from '../index';

describe('<SignUpPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <SignUpPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
