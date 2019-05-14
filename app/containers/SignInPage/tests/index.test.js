import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import SignInPage from '../index';

describe('<SignInPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <SignInPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
