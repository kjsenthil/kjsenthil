import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PillsNavigation, { PillsNavigationProps } from './PillsNavigation';
import PillsNavigationTab from './PillsNavigationTab/PillsNavigationTab.styles';
import {
  PillNavigationCreatorTabComponent,
  PillsNavigationSelectableTabComponent,
} from './PillsNavigationTabComponent/PillsNavigationTabComponent';

export default {
  title: 'Digital Hybrid/Molecules/Pills Navigation',
  component: PillsNavigation,
  argTypes: {
    // custom argTypes here...
  },
} as Meta;

const Template: Story<PillsNavigationProps> = () => {
  const [currentValue, setCurrentValue] = React.useState('Pill 1');

  const handlePillsNavigationChange = (e: React.ChangeEvent<{}>, newValue: string) => {
    setCurrentValue(newValue);
  };

  return (
    <PillsNavigation value={currentValue} onChange={handlePillsNavigationChange}>
      <PillsNavigationTab
        component={PillsNavigationSelectableTabComponent}
        label="Pill 1"
        value="Pill 1"
      />
      <PillsNavigationTab
        component={PillsNavigationSelectableTabComponent}
        label="Pill 2"
        value="Pill 2"
      />
      <PillsNavigationTab
        component={PillNavigationCreatorTabComponent}
        label="Pill 3"
        value="Pill 3"
      />
    </PillsNavigation>
  );
};

const defaultArgs: PillsNavigationProps = {
  // default arguments here...
};

export const Default = Template.bind({});
Default.args = defaultArgs;
