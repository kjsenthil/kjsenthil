import React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import GoalCreationLayout from './GoalCreationLayout';

const deleteHandler = jest.fn();

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
    expect(screen.getByText('Save to my to-do list')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('Renders the goal delete modal when the delete button is clicked', () => {
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

    expect(screen.queryByText('Delete goal')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Delete goal');
  });

  it('Calls the delete goal handler when the delete button is clicked', () => {
    renderWithTheme(
      <GoalCreationLayout
        title="Some title"
        iconAlt="goal image alt text"
        progressButtonTitle="Next"
        progressEventHandler={() => {}}
        onDeleteHandler={deleteHandler}
        tabsNavigationProps={{
          currentPath: '',
          tabs: [],
          onClick: () => {},
        }}
      >
        <div data-testid="some-child-element" />
      </GoalCreationLayout>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete goal' }));

    expect(deleteHandler).toHaveBeenCalled();
  });

  it('Closes the goal deletion modal when the back button is clicked', () => {
    renderWithTheme(
      <GoalCreationLayout
        title="Some title"
        iconAlt="goal image alt text"
        progressButtonTitle="Next"
        progressEventHandler={() => {}}
        onDeleteHandler={deleteHandler}
        tabsNavigationProps={{
          currentPath: '',
          tabs: [],
          onClick: () => {},
        }}
      >
        <div data-testid="some-child-element" />
      </GoalCreationLayout>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.click(screen.getByRole('button', { name: 'I am not sure, take me back!' }));

    expect(screen.getByRole('button', { name: 'I am not sure, take me back!' })).not.toBeVisible();
  });
});
