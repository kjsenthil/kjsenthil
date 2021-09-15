import React from 'react';
import { renderWithTheme, screen, cleanup } from '@tsw/test-util';
import ConfirmationModal from './ConfirmationModal';
import { Typography } from '../../atoms';
import { ConfirmationModalProps } from './types';

jest.mock('../../atoms/Icon', () => ({
  __esModule: true,
  default: ({ name }) => <div>{name}</div>,
}));

jest.mock('../../atoms/Button', () => ({
  __esModule: true,
  default: ({ label }) => <div>{label}</div>,
}));

afterEach(() => {
  cleanup();
});

const multipleChoicesModalProps: ConfirmationModalProps = {
  open: true,
  title: 'Informative title',
  icon: {
    name: 'infoCircleIcon',
    color: 'primary',
  },
  message: (
    <>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        Information
      </Typography>
    </>
  ),
  buttons: [
    {
      label: 'ButtonOne',
      variant: 'contained',
      color: 'primary',
      handler: () => {},
    },
    {
      label: 'ButtonTwo',
      variant: 'outlined',
      color: 'primary',
      handler: () => {},
    },
  ],
};

const singleChoiceModalProps: ConfirmationModalProps = {
  open: true,
  title: 'Error title',
  icon: {
    name: 'errorCircle',
    color: 'error',
  },
  message: (
    <>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        Error Message
      </Typography>
    </>
  ),
  buttons: [
    {
      label: 'ButtonOne',
      variant: 'contained',
      color: 'primary',
      handler: () => {},
    },
  ],
};

describe('confirmation Modal', () => {
  test('Renders the modal with multiple choices', () => {
    renderWithTheme(<ConfirmationModal {...multipleChoicesModalProps} />);

    expect(screen.getByText('Informative title')).toBeInTheDocument();
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('infoCircleIcon')).toBeInTheDocument();
    expect(screen.getByText('ButtonOne')).toBeInTheDocument();
    expect(screen.getByText('ButtonTwo')).toBeInTheDocument();
  });

  test('Renders the modal with a single choice', () => {
    renderWithTheme(<ConfirmationModal {...singleChoiceModalProps} />);
    expect(screen.getByText('Error title')).toBeInTheDocument();
    expect(screen.getByText('Error Message')).toBeInTheDocument();
    expect(screen.getByText('errorCircle')).toBeInTheDocument();
    expect(screen.getByText('ButtonOne')).toBeInTheDocument();
  });
});
