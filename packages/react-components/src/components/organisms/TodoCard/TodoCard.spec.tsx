import { renderWithTheme, screen } from '@tsw/test-util';
import React from 'react';
import TodoCard from './TodoCard';
import { Typography } from '../../atoms';

describe('TodoCard', () => {
  const cardTitle = 'I am a title';
  const cardText = 'I am some text';
  const labelText = 'I am a label';
  const extraContentText = 'I am some extra content';

  it('Renders Todo card with all content', () => {
    renderWithTheme(
      <TodoCard
        title={cardTitle}
        text={cardText}
        iconProps={{
          name: 'account',
          color: 'primary',
        }}
        labelProps={{
          text: labelText,
          color: 'success',
          colorShade: 'main',
        }}
      />
    );
    expect(screen.getByText(cardTitle)).toBeVisible();
    expect(screen.getByText(cardText)).toBeVisible();
    expect(screen.getByText(labelText)).toBeVisible();
  });

  it('Renders Todo card with all content and child content', () => {
    renderWithTheme(
      <TodoCard
        title={cardTitle}
        text={cardText}
        iconProps={{
          name: 'account',
          color: 'primary',
        }}
        labelProps={{
          text: labelText,
          color: 'success',
          colorShade: 'main',
        }}
        extraContent={<Typography>I am some extra content</Typography>}
      />
    );
    expect(screen.getByText(cardTitle)).toBeVisible();
    expect(screen.getByText(cardText)).toBeVisible();
    expect(screen.getByText(labelText)).toBeVisible();
    expect(screen.getByText(extraContentText)).toBeVisible();
  });

  it('Renders Todo card without label', () => {
    renderWithTheme(
      <TodoCard
        title={cardTitle}
        text={cardText}
        iconProps={{
          name: 'account',
          color: 'primary',
        }}
      />
    );
    expect(screen.getByText(cardTitle)).toBeVisible();
    expect(screen.getByText(cardText)).toBeVisible();
    expect(screen.queryByText(labelText)).not.toBeInTheDocument();
  });

  it('Calls onClick when card is clicked', () => {
    const mockOnClick = jest.fn();
    renderWithTheme(<TodoCard title={cardTitle} text={cardText} onClick={mockOnClick} />);
    const todoCard = screen.getByRole('button');
    todoCard.click();
    expect(mockOnClick.mock.calls.length).toBe(1);
  });
});
