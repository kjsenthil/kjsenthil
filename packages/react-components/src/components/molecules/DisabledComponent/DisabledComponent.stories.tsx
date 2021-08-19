import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DisabledComponent, { DisabledComponentProps } from './DisabledComponent';
import { Button } from '../../atoms';
import { LoginForm } from '../../organisms';

export default {
  title: 'Digital Hybrid/Molecules/Disabled Component',
  component: DisabledComponent,
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      description: 'The text within the Tooltip.',
      defaultValue: 'Comming Soon',
    },
    arrow: {
      control: {
        type: 'radio',
      },
      options: [true, false],
      defaultValue: true,
    },
    placement: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'top', 'right', 'bottom', 'left'],
    },
  },
} as Meta;

const Template: Story<DisabledComponentProps> = (args) => <DisabledComponent {...args} />;

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  children: (
    <Button color="primary" variant="contained">
      Disabled Button
    </Button>
  ),
};

export const DisabledForm = Template.bind({});
DisabledForm.args = {
  children: <LoginForm onSubmit={() => Promise.resolve()} />,
};
