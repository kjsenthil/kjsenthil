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

const coachImages = {
  coachPortrait: {
    childImageSharp: {
      fluid: {
        aspectRatio: 0.65,
        src: 'coachPortrait.png',
        srcSet:
          '/coachPortrait.png 25w,/coachPortrait.png 50w,/coachPortrait.png 100w,coachPortrait.png 150w,/coachPortrait.png 200w,/coachPortrait.png 300w',
        sizes: '(max-width: 100px) 100vw, 100px',
      },
    },
  },
  coachIcon: {
    childImageSharp: {
      fluid: {
        aspectRatio: 0.65,
        src: 'coachIcon.png',
        srcSet:
          '/coachIcon.png 25w,/coachIcon.png 50w,/coachIcon.png 100w,coachIcon.png 150w,/coachIcon.png 200w,/coachIcon.png 300w',
        sizes: '(max-width: 100px) 100vw, 100px',
      },
    },
  },
};

const defaultArgs: HeaderMenuProps = {
  isNonProd: false,
  myAccountsUrl: 'https://google.com',
  cash: '£101,100.00',
  homePath: '/',
  expFeatureSwitch,
  currentUrl: '/investment',
  coachImages,
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
