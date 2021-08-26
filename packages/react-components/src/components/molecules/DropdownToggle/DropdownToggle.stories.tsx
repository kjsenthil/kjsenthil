import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import DropdownToggle, { DropdownToggleProps } from './DropdownToggle';

export default {
  title: 'Digital Hybrid/Molecules/DropdownToggle',
  component: DropdownToggle,
  argTypes: {
    dropdownToggled: {
      control: {
        type: 'boolean',
      },
    },
    variant: {
      control: {
        type: 'radio',
        options: ['h1', 'h2', 'h3'],
      },
    },
  },
} as Meta;

const Dropdown = () => (
  <Card style={{ minWidth: 200 }}>
    <List aria-label="contacts">
      <ListItem button>
        <ListItemText primary="ISA - Miss J Doe" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Investment account - Mr J Doe" />
      </ListItem>
    </List>
  </Card>
);

const Template: Story<DropdownToggleProps> = (args) => <DropdownToggle {...args} />;

const defaultArgs: DropdownToggleProps = {
  value: 'ISA',
  label: 'BI123456 - Mr J Doe',
  variant: 'h1',
  renderDropdown: <Dropdown />,
  dropdownToggled: false,
  setDropdownToggled: () => {},
};

export const Default = Template.bind({});

Default.args = defaultArgs;
