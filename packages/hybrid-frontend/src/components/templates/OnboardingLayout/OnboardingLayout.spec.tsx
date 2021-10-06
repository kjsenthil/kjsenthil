import * as React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import OnboardingLayout, { OnboardingLayoutProps } from './OnboardingLayout';

const props: OnboardingLayoutProps = {
  title: 'Create profile',
  primaryActionProps: {
    onClick: jest.fn(),
    children: 'Continue',
  },

  contentLeft: <div>Left content</div>,
  contentRight: <div>Right content</div>,
  stepNames: ['Step1', 'Step2'],
  currentStep: 1,
};

describe('OnboardingLayout', () => {
  it('renders title', () => {
    renderWithTheme(<OnboardingLayout {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it('renders step progres', () => {
    renderWithTheme(<OnboardingLayout {...props} />);

    expect(screen.getByText('1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Step1')).toBeInTheDocument();
  });

  it('renders continueAction with onClick handler', () => {
    renderWithTheme(<OnboardingLayout {...props} />);

    const continueButton = screen.getByText('Continue');

    fireEvent.click(continueButton);

    expect(props.primaryActionProps?.onClick).toHaveBeenCalledTimes(1);
  });

  it('does not render back button ', () => {
    renderWithTheme(<OnboardingLayout {...props} />);

    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  it('renders backAction with onClick handler', () => {
    const mockBackOnClick = jest.fn();

    renderWithTheme(
      <OnboardingLayout
        {...props}
        secondaryActionProps={{ onClick: mockBackOnClick, children: 'Back' }}
      />
    );

    const continueButton = screen.getByText('Back');

    fireEvent.click(continueButton);

    expect(mockBackOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not render skip button', () => {
    renderWithTheme(<OnboardingLayout {...props} />);

    expect(screen.queryByText('Skip')).not.toBeInTheDocument();
  });

  it('renders continueAction', () => {
    const mockSkipOnClick = jest.fn();
    renderWithTheme(
      <OnboardingLayout
        {...props}
        tertiaryActionProps={{ onClick: mockSkipOnClick, children: 'Skip' }}
      />
    );

    const continueButton = screen.getByText('Skip');

    fireEvent.click(continueButton);

    expect(mockSkipOnClick).toHaveBeenCalledTimes(1);
  });
});
