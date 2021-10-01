import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ToggleGroup, { ToggleGroupProps } from './ToggleGroup';

export default {
  title: 'Digital Hybrid/Organisms/Toggle Group',
  component: ToggleGroup,
  args: {},
} as Meta;

type StoryToggleGroupProps = Omit<ToggleGroupProps, 'initialValue' | 'handleChange'>;

const Template: Story<StoryToggleGroupProps> = (args) => {
  const [selected, setSelected] = React.useState('left');
  const handleSelected = (_event: any, newSelected: React.SetStateAction<string>) => {
    setSelected(newSelected);
  };

  return <ToggleGroup initialValue={selected} handleChange={handleSelected} {...args} />;
};

export const Ordered = Template.bind({});
Ordered.args = {
  type: 'ordered',
  values: [
    'I have hardly ever invested before and have little knowledge of investing generally',
    'I have some experience of investing in a limited range of investments such as unit trusts and broadly understand how it works',
    'I regularly invest in funds and directly in equities and am familiar with funds and markets',
    'I am a very experienced and knowledgeable private investor and regularly invest in a wide range of investments',
  ],
};

export const Unordered = Template.bind({});
Unordered.args = {
  type: 'unordered',
  values: ['left', 'center', 'right'],
};
