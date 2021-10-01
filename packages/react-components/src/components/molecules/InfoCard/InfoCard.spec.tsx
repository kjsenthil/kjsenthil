import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import InfoCard, { InfoCardProps } from './InfoCard';

describe('InfoCard', () => {
  const testGoal: InfoCardProps = {
    title: 'Info Card',
    content: 'Test Content',
  };

  it('should render the title and content', () => {
    renderWithTheme(<InfoCard {...testGoal} />);

    expect(screen.getByText(testGoal.title)).toBeInTheDocument();
    expect(screen.getByText(testGoal.content)).toBeInTheDocument();
  });
});
