import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import HeaderMenu, { HeaderMenuProps } from './HeaderMenu';

export default {
  title: 'Digital Hybrid/Organisms/Header Menu',
  component: HeaderMenu,
} as Meta;

const Template: Story<HeaderMenuProps> = (args) => <HeaderMenu {...args} />;

export const Default = Template.bind({});

const defaultArgs: HeaderMenuProps = {
  profileName: 'Ava Garcia',
};

Default.args = defaultArgs;
