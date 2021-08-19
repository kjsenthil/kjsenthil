import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import LikelyRangeToggle, { LikelyRangeToggleProps } from './index';

export default {
  title: 'Digital Hybrid/Organisms/Performance Projections Chart/Likely Range Toggle',
  component: LikelyRangeToggle,
} as Meta;

const Template: Story<LikelyRangeToggleProps> = () => {
  const [showLikelyRange, setShowLikelyRange] = React.useState(true);

  return (
    <div style={{ display: 'flex' }}>
      <LikelyRangeToggle
        showLikelyRange={showLikelyRange}
        toggleLikelyRange={() => setShowLikelyRange((prev) => !prev)}
      />
    </div>
  );
};

export const Default = Template.bind({});
