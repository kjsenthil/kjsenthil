import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ToggleGroup, { ToggleGroupProps } from './ToggleGroup';

export default {
  title: 'Digital Hybrid/Organisms/Toggle Group',
  component: ToggleGroup,
  args: {},
} as Meta;

const PromptYes = () => <div>Congrats! You clicked Yes</div>;
const PromptNo = () => <div>Boo! You clicked No</div>;

const getInitialSelectedValue = (values: ToggleGroupProps['values']): string => {
  const firstValue = values[0];

  return typeof firstValue === 'string' ? firstValue : firstValue.value;
};

type ToggleGroupStoryProps = Omit<ToggleGroupProps, 'selectedValue' | 'setSelectedValue'>;

const ToggleGroupTemplate: Story<ToggleGroupStoryProps> = ({ values, ...args }) => {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(
    getInitialSelectedValue(values)
  );

  return (
    // @ts-ignore - TS can't dynamically infer that the props we're passing to
    // this Story will fit either the can or can't have prompts layout, hence
    // the ts-ignore.
    // When we're actually using the component, TS will be able to infer this.
    <ToggleGroup
      selectedValue={selectedValue}
      setSelectedValue={(newValue) => setSelectedValue(newValue)}
      values={values}
      {...args}
    />
  );
};

// This is used to show how content beneath the toggle group is pushed downwards
// when a prompt is shown.
const ToggleGroupWithExtraContentUnderneath: Story<ToggleGroupStoryProps> = ({
  values,
  ...args
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(
    getInitialSelectedValue(values)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* TS can't dynamically infer that the props we're passing to this Story
          will fit either the can or can't have prompts layout, hence the
          ts-ignore.
          When we're actually using the component, TS will be able to infer
          this.
      */}
      {/* @ts-ignore */}
      <ToggleGroup
        selectedValue={selectedValue}
        setSelectedValue={(newValue) => setSelectedValue(newValue)}
        values={values}
        {...args}
      />
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </div>
    </div>
  );
};

export const Dynamic = ToggleGroupTemplate.bind({});
Dynamic.args = {
  layout: 'dynamic',
  values: ['left', 'center', 'right'],
};

export const OnePerRow = ToggleGroupTemplate.bind({});
OnePerRow.args = {
  layout: 'onePerRow',
  values: [
    'I have hardly ever invested before and have little knowledge of investing generally',
    'I have some experience of investing in a limited range of investments such as unit trusts and broadly understand how it works',
    'I regularly invest in funds and directly in equities and am familiar with funds and markets',
    'I am a very experienced and knowledgeable private investor and regularly invest in a wide range of investments',
  ],
};

export const OneRowOnly = ToggleGroupTemplate.bind({});
OneRowOnly.args = {
  layout: 'oneRowOnly',
  values: ['Yes', 'No', 'May be'],
};

export const OneRowOnlyWithPrompts = ToggleGroupTemplate.bind({});
OneRowOnlyWithPrompts.args = {
  layout: 'oneRowOnly',
  values: [
    { value: 'Yes', prompt: <PromptYes /> },
    { value: 'No', prompt: <PromptNo /> },
    'No prompt',
  ],
};

export const OneRowOnlyWithPromptsInception = ToggleGroupTemplate.bind({});
OneRowOnlyWithPromptsInception.args = {
  values: [
    {
      value: 'Inception',
      prompt: (
        <ToggleGroupTemplate
          layout="oneRowOnly"
          values={[
            {
              value: 'Inception',
              prompt: <div>Dream within a dream.</div>,
            },
            'No prompt',
          ]}
        />
      ),
    },
    'No prompt',
  ],
};

export const OneRowOnlyWithPromptsAndOtherContentUnderneath = ToggleGroupWithExtraContentUnderneath.bind(
  {}
);
OneRowOnlyWithPromptsAndOtherContentUnderneath.args = {
  layout: 'oneRowOnly',
  values: [
    { value: 'Yes', prompt: <PromptYes /> },
    { value: 'No', prompt: <PromptNo /> },
    'No prompt',
  ],

  // @ts-ignore - TS can't infer that this prop is safe in this Story, but will
  // be able to infer this when we're actually using the component.
  equalWidthChildren: 18.5,

  toggleGroupButtonProps: {
    centerText: true,
  },
};
