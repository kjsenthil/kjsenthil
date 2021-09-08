import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AccountFilter, { AccountFilterProps } from './AccountFilter';

export default {
  title: 'Digital Hybrid/Organisms/Account Filter',
  component: AccountFilter,
  argTypes: {
    selection: {
      table: { disable: true },
    },
    onSelectionChanged: {
      table: { disable: true },
    },
  },
} as Meta;

type TemplateProps = Omit<AccountFilterProps, 'selection' | 'onSelectionChanged'>;

const Template: Story<TemplateProps> = (props) => {
  const [selected, setSelected] = useState('all-accounts');

  return <AccountFilter {...props} selection={selected} onSelectionChanged={setSelected} />;
};

export const Default = Template.bind({});
Default.args = {
  hasLinkedAccounts: true,
};
