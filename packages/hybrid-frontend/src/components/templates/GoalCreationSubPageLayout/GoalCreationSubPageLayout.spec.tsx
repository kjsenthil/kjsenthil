import * as React from 'react';
import { useBreakpoint } from '@tswdts/react-components';
import { screen, renderWithTheme } from '@tsw/test-util';
import GoalCreationSubPageLayout from './GoalCreationSubPageLayout';
import { useStateIsAvailable } from '../../../hooks';

jest.mock('@tswdts/react-components');
jest.mock('../../../hooks');

describe('GoalCreationSubPageLayout', () => {
  beforeEach(() => {
    (useStateIsAvailable as jest.Mock).mockReturnValue(true);
    (useBreakpoint as jest.Mock).mockReturnValue({ isMobile: false });
  });

  function TestComponent() {
    const refOne = React.useRef(null);
    const refTwo = React.useRef(null);
    const content = [
      { hash: '#one', ref: refOne, element: <div>One</div> },
      { hash: '#two', ref: refTwo, element: <div>Two</div> },
    ];

    return (
      <GoalCreationSubPageLayout
        currentUrlHash=""
        contentMain={content}
        contentSide={<div>Side</div>}
      />
    );
  }

  it('renders correctly', () => {
    renderWithTheme(<TestComponent />);

    expect(screen.getByText('One')).toBeVisible();
    expect(screen.getByText('Two')).toBeVisible();
    expect(screen.getByText('Side')).toBeVisible();
  });
});
