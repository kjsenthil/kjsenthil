import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import CoachMeetTheCoaches from './CoachMeetTheCoaches';
import { useBreakpoint } from '../../../hooks';

jest.mock('../../../hooks');

const coaches = [
  {
    name: 'Matt Morgan',
    bio: 'Coach 1 background test paragraph',
    image: 'mattImage.jpg',
  },
  {
    name: 'Sammy Lawson',
    bio: 'Coach 2 background test paragraph',
    image: 'sammyImage.jpg',
  },
  {
    name: 'Charles Davies',
    bio: 'Coach 3 background test paragraph',
    image: 'charlesImage.jpg',
  },
];

describe('CoachMeetTheCoaches', () => {
  beforeEach(() => {
    (useBreakpoint as jest.Mock).mockReturnValue({ isMobile: false });
  });

  test('Renders the Meet the Coaches component', () => {
    renderWithTheme(<CoachMeetTheCoaches coaches={coaches} />);

    expect(screen.getByText('Meet our coaches')).toBeInTheDocument();
    expect(screen.getByText('Matt Morgan')).toBeInTheDocument();
    expect(screen.getByText('Coach 1 background test paragraph')).toBeInTheDocument();
    expect(screen.getByAltText('Matt Morgan')).toBeInTheDocument();
    expect(screen.getByText('Sammy Lawson')).toBeInTheDocument();
    expect(screen.getByText('Coach 2 background test paragraph')).toBeInTheDocument();
    expect(screen.getByAltText('Sammy Lawson')).toBeInTheDocument();
    expect(screen.getByText('Charles Davies')).toBeInTheDocument();
    expect(screen.getByText('Coach 3 background test paragraph')).toBeInTheDocument();
    expect(screen.getByAltText('Charles Davies')).toBeInTheDocument();
  });

  test('Renders properly with only 1 coach', () => {
    const oneCoach = [
      {
        name: 'Matt Morgan',
        bio: 'Coach 1 background test paragraph',
        image: 'mattImage.jpg',
      },
    ];
    renderWithTheme(<CoachMeetTheCoaches coaches={oneCoach} />);

    expect(screen.getByText('Matt Morgan')).toBeInTheDocument();
    expect(screen.getByText('Coach 1 background test paragraph')).toBeInTheDocument();
    expect(screen.getByAltText('Matt Morgan')).toBeInTheDocument();
  });

  test('Renders desktop view above breakpoint', () => {
    renderWithTheme(<CoachMeetTheCoaches coaches={coaches} />);

    expect(screen.getByTestId('meet-the-coach-desktop')).toBeInTheDocument();
  });

  test('Renders mobile view at breakpoint', () => {
    (useBreakpoint as jest.Mock).mockReturnValue({ isMobile: true });

    renderWithTheme(<CoachMeetTheCoaches coaches={coaches} />);

    expect(screen.getByTestId('meet-the-coach-mobile')).toBeInTheDocument();
  });
});
