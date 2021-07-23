import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalCreationSubPageLayout, {
  GoalCreationSubPageLayoutProps,
} from './GoalCreationSubPageLayout';

const ExampleElement = React.forwardRef<HTMLDivElement, { text: string; onClick?: () => void }>(
  ({ text, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        width: '100%',
        border: '2px solid #dddaed',
        padding: 20,
        borderRadius: 5,
      }}
      {...rest}
    >
      {text}
    </div>
  )
);

export default {
  title: 'Digital Hybrid/Templates/Goal Creation Sub Page Layout (Experimental)',
  component: GoalCreationSubPageLayout,
  argTypes: {
    contentMain: {
      control: {
        type: null,
      },
    },
    contentSide: {
      control: {
        type: null,
      },
    },
    currentUrlHash: {
      control: {
        type: null,
      },
    },
  },
} as Meta;

type StoryProps = Omit<
  GoalCreationSubPageLayoutProps,
  'contentMain' | 'contentSide' | 'currentUrlHash'
>;

const Template: Story<StoryProps> = (args) => {
  const [fakeUrlHash, setFakeUrlHash] = React.useState('');

  const stepOneRef = React.useRef(null);
  const stepTwoRef = React.useRef(null);
  const stepThreeRef = React.useRef(null);

  const mainContentElements = [
    {
      hash: '#step-1',
      ref: stepOneRef,
      element: (
        <ExampleElement
          ref={stepOneRef}
          text="Step 1 - Click me!"
          onClick={() => setFakeUrlHash('#step-1')}
        />
      ),
    },
    {
      hash: '#step-2',
      ref: stepTwoRef,
      element: (
        <ExampleElement
          ref={stepTwoRef}
          text="Step 2 - Click me!"
          onClick={() => setFakeUrlHash('#step-2')}
        />
      ),
    },
    {
      hash: '#step-3',
      ref: stepThreeRef,
      element: (
        <ExampleElement
          ref={stepThreeRef}
          text="Step 3 - Click me!"
          onClick={() => setFakeUrlHash('#step-3')}
        />
      ),
    },
  ];

  return (
    <GoalCreationSubPageLayout
      currentUrlHash={fakeUrlHash}
      contentMain={mainContentElements}
      contentSide={<ExampleElement text="Side content" />}
      {...args}
    />
  );
};

const defaultArgs: StoryProps = {
  sideContentFirstOnMobile: true,
  mainContentHorizontalSwipeOnMobile: true,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
