import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Icon } from '../../atoms';
import HeaderMenu, { HeaderMenuProps } from './HeaderMenu';

export default {
  title: 'Digital Hybrid/Organisms/Header Menu',
  component: HeaderMenu,
} as Meta;

const Template: Story<HeaderMenuProps> = (args) => <HeaderMenu {...args} />;

export const Default = Template.bind({});

/* eslint-disable-next-line no-alert */
const expFeatureSwitch = (isEnabled: boolean) => alert(`isEnabled: ${isEnabled}`);

const defaultArgs: HeaderMenuProps = {
  isNonProd: false,
  myAccountsUrl: 'https://google.com',
  cash: '£101,100.00',
  homePath: '/',
  expFeatureSwitch,
  currentUrl: '/investment',
  links: [
    {
      name: 'Investment',
      path: '/investment',
      shouldShowInDrawer: true,
      shouldShowInMainMenu: true,
    },
    {
      name: 'Life plan',
      path: '/life-plan',
      shouldShowInDrawer: true,
      shouldShowInMainMenu: true,
    },
    { name: 'My accounts login', path: 'https://google.com', shouldShowInDrawer: true },
    {
      name: 'Experimental features',
      type: 'switch',
      onClick: expFeatureSwitch,
      shouldShowInDrawer: true,
    },
    {
      name: 'Logout',
      path: '/logout',
      shouldShowInDrawer: true,
      shouldShowInDropdownMenu: true,
      color: 'error',
      icon: <Icon name="exit" color="error" />,
    },
  ],
};

Default.args = defaultArgs;
