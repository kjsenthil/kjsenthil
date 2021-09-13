import * as React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import GoalDeleteModal, { GoalDeleteModalProps } from './GoalDeleteModal';

const closeHandler = jest.fn();
const deleteHandler = jest.fn();

describe('Goal Delete Modal', () => {
  const goalDeleteModalProps: GoalDeleteModalProps = {
    title: 'Delete goal',
    imgSrc: '/warning.png',
    imgAlt: 'Warning symbol',
    isOpen: true,
    onCloseHandler: closeHandler,
    onDeleteHandler: deleteHandler,
  };

  test('Renders with the expected content', () => {
    renderWithTheme(<GoalDeleteModal {...goalDeleteModalProps} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Delete goal');
    expect(screen.getByRole('img')).toHaveAttribute('src', '/warning.png');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Warning symbol');
    expect(
      screen.getByText(
        'Are you sure you want to delete this goal? This is permanent and cannot be undone.'
      )
    ).toBeVisible();
    expect(screen.getByRole('button', { name: 'Delete goal' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'I am not sure, take me back!' })).toBeVisible();
  });

  test('Calls the delete goal handler when the delete button is clicked', () => {
    renderWithTheme(<GoalDeleteModal {...goalDeleteModalProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Delete goal' }));
    expect(deleteHandler).toHaveBeenCalled();
  });

  test('Calls the close modal handler when the back button is clicked', () => {
    renderWithTheme(<GoalDeleteModal {...goalDeleteModalProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'I am not sure, take me back!' }));
    expect(closeHandler).toHaveBeenCalled();
  });
});
