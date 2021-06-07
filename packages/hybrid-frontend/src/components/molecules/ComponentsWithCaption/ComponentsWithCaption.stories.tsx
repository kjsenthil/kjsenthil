import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import FormInput from '../FormInput';
import ComponentsWithCaption, { ComponentsWithCaptionProps } from './ComponentsWithCaption';
import { Button } from '../../atoms';
import AccountsTable from '../../organisms/AccountsTable';
import { mockAccountsTableData, mockAccountsTableHeader } from '../../../constants/storybook';

export default {
  title: 'Digital Hybrid/Molecules/Container With Caption',
  component: ComponentsWithCaption,
  argTypes: {
    caption: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const Template: Story<ComponentsWithCaptionProps> = (args) => <ComponentsWithCaption {...args} />;

export const SingleFormInputsWithCaption = Template.bind({});
SingleFormInputsWithCaption.args = {
  caption: 'Here is the caption',
  children: <FormInput label="Input" />,
};

export const MultipleFormInputsWithCaption = Template.bind({});
MultipleFormInputsWithCaption.args = {
  caption: 'Here is the caption',
  children: (
    <>
      <FormInput label="Input 1" />
      <FormInput label="Input 2" />
      <FormInput label="Input 3" />
      <FormInput label="Input 3" />
    </>
  ),
};

export const ButtonWithCaption = Template.bind({});
ButtonWithCaption.args = {
  caption: 'Here is the caption',
  children: (
    <Button color="primary" variant="contained">
      Button
    </Button>
  ),
};

export const AccountsTableWithCaption = Template.bind({});
AccountsTableWithCaption.args = {
  caption: 'Here is the caption',
  children: <AccountsTable headerRow={mockAccountsTableHeader} dataRow={mockAccountsTableData} />,
};
