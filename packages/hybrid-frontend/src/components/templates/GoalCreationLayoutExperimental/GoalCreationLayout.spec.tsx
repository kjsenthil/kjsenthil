import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import GoalCreationLayout from './GoalCreationLayout';

describe('GoalCreationLayout', () => {
  it('Renders with child elements and default params', () => {
    renderWithTheme(
      <GoalCreationLayout
        title="Some title"
        iconAlt="goal image alt text"
        progressButtonTitle="Next"
        progressEventHandler={() => {}}
        onDeleteHandler={() => {}}
        tabsNavigationProps={{
          currentPath: '',
          tabs: [],
          onClick: () => {},
        }}
      >
        <div data-testid="some-child-element" />
      </GoalCreationLayout>
    );
    expect(screen.getByText('Some title')).toBeInTheDocument();
    expect(screen.getByTestId('some-child-element')).toBeInTheDocument();
    expect(screen.getByAltText('goal image alt text')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
