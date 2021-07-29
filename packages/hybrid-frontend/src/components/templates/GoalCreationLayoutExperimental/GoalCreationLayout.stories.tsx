import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalCreationLayout, { GoalCreationLayoutProps } from './GoalCreationLayout';
import { Typography } from '../../atoms';
import { MainCard } from '../../molecules';

const noControl = {
  control: {
    type: null,
  },
};

export default {
  title: 'Digital Hybrid/Templates/Goal Creation Layout (Experimental)',
  component: GoalCreationLayout,
  argTypes: {
    tabsNavigationProps: { ...noControl },
    progressEventHandler: { ...noControl },
    onDeleteHandler: { ...noControl },
    onCancelHandler: { ...noControl },
    children: { ...noControl },
  },
} as Meta;

type StoryProps = Omit<GoalCreationLayoutProps, 'tabsNavigationProps' | 'children'>;

const ExampleContent = ({ content }: { content: string }) => (
  <MainCard>
    <Typography>{content}</Typography>
  </MainCard>
);

const Template: Story<StoryProps> = (args) => {
  const [currentPath, setCurrentPath] = React.useState('');

  const content =
    currentPath === 'tab-2' ? (
      <ExampleContent content="Tab 2 content" />
    ) : (
      <ExampleContent content="Tab 1 content" />
    );

  return (
    <GoalCreationLayout
      {...args}
      tabsNavigationProps={{
        currentPath,
        onClick: setCurrentPath,
        tabs: [
          { path: 'tab-1', label: 'Tab 1' },
          { path: 'tab-2', label: 'Tab 2' },
        ],
      }}
    >
      {content}
    </GoalCreationLayout>
  );
};

const defaultArgs: StoryProps = {
  progressEventHandler: () => {},
};

export const Default = Template.bind({});
Default.args = defaultArgs;
