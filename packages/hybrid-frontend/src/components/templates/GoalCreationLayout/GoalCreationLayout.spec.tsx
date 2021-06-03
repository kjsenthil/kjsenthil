import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import GoalCreationLayout from './GoalCreationLayout';

describe('GoalCreationLayout', () => {
  it('Renders with child elements and default params', async () => {
    renderWithTheme(
      <GoalCreationLayout>
        <div data-testid="some-child-element" />
      </GoalCreationLayout>
    );
    expect(await screen.findByTestId('some-child-element')).toBeInTheDocument();
    expect(await screen.findByText('Your life after work')).toBeInTheDocument();
    expect(await screen.findByAltText('goal image')).toBeInTheDocument();
  });

  it('Renders with child elements with params', async () => {
    renderWithTheme(
      <GoalCreationLayout
        title="test-title"
        iconAlt="test-alt"
        progressEventHandler={() => {}}
        onDeleteHandler={() => {}}
        progressButtonTitle="test-next"
      >
        <div data-testid="some-child-element" />
      </GoalCreationLayout>
    );
    expect(await screen.findByTestId('some-child-element')).toBeInTheDocument();
    expect(await screen.findByText('test-title')).toBeInTheDocument();
    expect(await screen.findByAltText('test-alt')).toBeInTheDocument();
    expect(await screen.findByText('test-next')).toBeInTheDocument();
    expect(await screen.findByText('Delete')).toBeInTheDocument();
  });
});
