import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SimulationForm, { SimulationFormProps } from './SimulationForm';

export default {
  title: 'Digital Hybrid/Organisms/Simulation Form',
  component: SimulationForm,
  argTypes: { onSubmit: { action: 'submitted' } },
} as Meta;

const Template: Story<SimulationFormProps> = (args) => <SimulationForm {...args} />;

export const Default = Template.bind({});
