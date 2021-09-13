import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalDeleteModal, { GoalDeleteModalProps } from './GoalDeleteModal';

export default {
  title: 'Digital Hybrid/Organisms/Goal Delete Modal',
  component: GoalDeleteModal,
  argTypes: {},
} as Meta;

const Template: Story<GoalDeleteModalProps> = (args) => <GoalDeleteModal {...args} />;

const DefaultProps: GoalDeleteModalProps = {
  title: 'Delete goal',
  imgSrc: '/warning.png',
  imgAlt: 'Warning symbol',
  isOpen: true,
  onCloseHandler: () => {},
  onDeleteHandler: () => {},
};
export const Default = Template.bind({});
Default.args = DefaultProps;
