import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ConfirmationModal from './ConfirmationModal';
import { ConfirmationModalProps } from './types';
import { Typography } from '../../atoms';

export default {
  title: 'Digital Hybrid/Molecules/Confirmation Modal',
  component: ConfirmationModal,
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
      options: [true, false],
    },
  },
} as Meta;

const Template: Story<ConfirmationModalProps> = (args) => <ConfirmationModal {...args} />;

export const MultipleChoiceForInformation = Template.bind({});
MultipleChoiceForInformation.args = {
  open: true,
  title: 'Informative title',
  icon: {
    name: 'infoCircleIcon',
    color: 'primary',
  },
  message: (
    <>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
    </>
  ),
  buttons: [
    {
      label: 'Confirm',
      variant: 'contained',
      color: 'primary',
      handler: () => {},
    },
    {
      label: 'Cancel',
      variant: 'outlined',
      color: 'primary',
      handler: () => {},
    },
  ],
};

export const MultipleChoiceForError = Template.bind({});
MultipleChoiceForError.args = {
  open: true,
  title: 'Error message',
  icon: {
    name: 'errorCircle',
    color: 'error',
  },
  message: (
    <>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
    </>
  ),
  buttons: [
    {
      label: 'Confirm',
      variant: 'contained',
      color: 'primary',
      handler: () => {},
    },
    {
      label: 'Cancel',
      variant: 'outlined',
      color: 'primary',
      handler: () => {},
    },
  ],
};

export const SingleChoiceForInformation = Template.bind({});
SingleChoiceForInformation.args = {
  open: true,
  title: 'Information title',
  icon: {
    name: 'infoCircleIcon',
    color: 'primary',
  },
  message: (
    <>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
      </Typography>
    </>
  ),
  buttons: [
    {
      label: 'Confirm',
      variant: 'contained',
      color: 'primary',
      handler: () => {},
    },
  ],
};

export const SingleChoiceForError = Template.bind({});
SingleChoiceForError.args = {
  open: true,
  title: 'Error Message!',
  icon: {
    name: 'errorCircle',
    color: 'error',
  },
  message: (
    <>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
    </>
  ),
  buttons: [
    {
      label: 'Confirm',
      variant: 'contained',
      color: 'primary',
      handler: () => {},
    },
  ],
};

export const MultipleChoiceAndParagraphs = Template.bind({});
MultipleChoiceAndParagraphs.args = {
  open: true,
  title: 'Information title!',
  icon: {
    name: 'infoCircleIcon',
    color: 'primary',
  },
  message: (
    <>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
    </>
  ),
  buttons: [
    {
      label: 'Confirm',
      variant: 'contained',
      color: 'primary',
      handler: () => {},
    },
    {
      label: 'Cancel',
      variant: 'outlined',
      color: 'primary',
      handler: () => {},
    },
  ],
};

export const SingleChoiceAndMultipleParagraphs = Template.bind({});
SingleChoiceAndMultipleParagraphs.args = {
  open: true,
  title: 'Information title!',
  icon: {
    name: 'infoCircleIcon',
    color: 'primary',
  },
  message: (
    <>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        proident mollit. Tempor consequat pariatur et Lorem dolor incididunt aliquip non duis non
        enim sint. Magna tempor ad officia ullamco proident minim ea tempor esse cupidatat nisi.
        Cillum est consequat voluptate fugiat proident quis qui fugiat cillum. Anim et aliqua cillum
        qui sint velit.
      </Typography>
    </>
  ),
  buttons: [
    {
      label: 'Confirm',
      variant: 'contained',
      color: 'primary',
      handler: () => {},
    },
  ],
};
