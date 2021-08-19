import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DigitalCoachBox, { DigitalCoachBoxProps } from './DigitalCoachBox';

export default {
  title: 'Digital Hybrid/Molecules/Digital Coach Box',
  component: DigitalCoachBox,
  argTypes: {},
} as Meta;

const Template: Story<DigitalCoachBoxProps> = (args) => (
  <div style={{ width: '463px' }}>
    <DigitalCoachBox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  description:
    'At retirement, you can normally take up to 25% of your pension from age 57 as a tax free cash lump sum. ',
  title: 'It might help to know...',
};
