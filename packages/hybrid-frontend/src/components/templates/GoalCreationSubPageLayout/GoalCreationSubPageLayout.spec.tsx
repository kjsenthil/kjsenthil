import * as React from 'react';
import { screen, renderWithTheme } from '@tsw/test-util';
import GoalCreationSubPageLayout from './GoalCreationSubPageLayout';

jest.mock('../../../hooks', () => ({
  useStateIsAvailable: jest.fn().mockReturnValue(true),
  useBreakpoint: jest.fn().mockReturnValue(false),
}));

describe('GoalCreationSubPageLayout', () => {
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
