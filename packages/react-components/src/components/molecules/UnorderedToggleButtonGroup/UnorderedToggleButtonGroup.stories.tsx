import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import UnorderedToggleButtonGroup, {
  UnorderedToggleButtonGroupProps,
} from './UnorderedToggleButtonGroup';

export default {
  title: 'Digital Hybrid/Molecules/Unordered Toggle Button Group',
  component: UnorderedToggleButtonGroup,
} as Meta;

const Template: Story<UnorderedToggleButtonGroupProps> = () => {
  const [selected, setSelected] = React.useState('left');

  const handleChange = (_event: any, newSelected: React.SetStateAction<string>) => {
    setSelected(newSelected);
  };
  const control = {
    values: ['left', 'center', 'right'],
    initialValue: selected,
    handleChange,
  };
  return <UnorderedToggleButtonGroup {...control} />;
};

export const Default = Template.bind({});
