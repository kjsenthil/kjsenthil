import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DescriptiveToggleButtonGroup, {
  DescriptiveToggleButtonGroupProps,
} from './DescriptiveToggleButtonGroup';
import { DescriptiveToggleButton } from '../DescriptiveToggleButton';

export default {
  title: 'Digital Hybrid/Molecules/Descriptive Toggle Button Group',
  component: DescriptiveToggleButtonGroup,
  argTypes: {
    // custom argTypes here...
  },
} as Meta;

const Template: Story<DescriptiveToggleButtonGroupProps> = (args) => {
  const [selected, setSelected] = React.useState<number | null>(null);

  const handleChange = (e: React.MouseEvent<HTMLElement>, value: number | null) => {
    setSelected(value);
  };

  return (
    <DescriptiveToggleButtonGroup {...args} value={selected} onChange={handleChange}>
      <DescriptiveToggleButton
        idNumber={1}
        content="I have hardly ever invested before and have little knowledge of investing generally"
        value={0}
        aria-label="button 1"
      />
      <DescriptiveToggleButton
        idNumber={2}
        content="I have some experience of investing in a limited range of investments such as unit trusts and broadly understand how it works"
        value={1}
        aria-label="button 2"
      />
      <DescriptiveToggleButton
        idNumber={3}
        content="I regularly invest in funds and directly in equities and am familiar with funds and markets"
        value={2}
        aria-label="button 3"
      />
      <DescriptiveToggleButton
        idNumber={4}
        content="I am a very experienced and knowledgeable private investor and regularly invest in a wide range of investments"
        value={3}
        aria-label="button 4"
      />
    </DescriptiveToggleButtonGroup>
  );
};

const defaultArgs: DescriptiveToggleButtonGroupProps = {
  exclusive: true,
  'aria-label': 'my toggle button group',
};

export const Default = Template.bind({});
Default.args = defaultArgs;
