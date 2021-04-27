import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import ButtonWithDropdown, { ButtonWithDropdownProps } from './ButtonWithDropdown';

export default {
  title: 'Digital Hybrid/Molecules/Button With Dropdown',
  component: ButtonWithDropdown,
  argTypes: {
    color: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'primary', 'secondary', 'tertiary'],
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'contained', 'outlined'],
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
  },
} as Meta;

function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.replace(/./g, (char: string) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const ActionList = () => (
  <Card style={{ minWidth: 200 }}>
    <List aria-label="contacts">
      <ListItem button>
        <ListItemIcon>
          <span>{countryToFlag('US')}</span>
        </ListItemIcon>
        <ListItemText primary="English" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <span>{countryToFlag('FR')}</span>
        </ListItemIcon>
        <ListItemText primary="French" />
      </ListItem>
    </List>
  </Card>
);

const Template: Story<ButtonWithDropdownProps> = (args) => (
  <ButtonWithDropdown renderDropdown={<ActionList />} {...args} />
);

const defaultArgs: Partial<ButtonWithDropdownProps> = {
  label: 'Languages',
  color: 'primary',
  variant: 'contained',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
