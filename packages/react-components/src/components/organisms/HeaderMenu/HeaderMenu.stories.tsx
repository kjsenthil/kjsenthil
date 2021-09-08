import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { navigate } from 'gatsby';
import HeaderMenu, { HeaderMenuProps } from './HeaderMenu';
import imageFile from '../../../assets/img/coachPortrait.png';
import imageIcon from '../../../assets/img/coachIcon.png';

export default {
  title: 'Digital Hybrid/Organisms/Header Menu',
  component: HeaderMenu,
} as Meta;

const Template: Story<HeaderMenuProps> = (args) => <HeaderMenu {...args} />;

export const Default = Template.bind({});

/* eslint-disable-next-line no-alert */
const expFeatureSwitch = (isEnabled: boolean) => alert(`isEnabled: ${isEnabled}`);

const switchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
  expFeatureSwitch(evt.target.checked);
};

const coachImages = {
  coachPortrait: {
    childImageSharp: {
      fluid: {
        aspectRatio: 0.65,
        src: imageFile,
        srcSet: `/${imageFile} 25w,/${imageFile} 50w,/${imageFile}  100w,${imageFile} 150w,/${imageFile}  200w,/${imageFile}  300w`,
        sizes: '(max-width: 100px) 100vw, 100px',
      },
    },
  },
  coachIcon: {
    childImageSharp: {
      fluid: {
        aspectRatio: 0.65,
        src: imageIcon,
        srcSet: `/${imageIcon} 25w,/${imageIcon} 50w,/${imageIcon}  100w,${imageIcon} 150w,/${imageIcon}  200w,/${imageIcon}  300w`,
        sizes: '(max-width: 100px) 100vw, 100px',
      },
    },
  },
};

const defaultArgs: HeaderMenuProps = {
  myAccountsUrl: 'https://google.com',
  homePath: '/',
  switchHandler,
  currentUrl: '/investments',
  coachImages,
  navigate,
  links: [
    {
      name: 'Investments',
      path: '/investments',
      shouldShowInDrawer: true,
      shouldShowInMainMenu: true,
      type: 'link',
      childLinks: [
        {
          name: 'Stocks & Shares ISA',
          path: '/stocks-shares',
          disabled: true,
        },
        {
          name: 'Self-invested Personal Pension',
          path: '/self-invested',
          disabled: true,
        },
        {
          name: 'Investment accounts',
          path: '/investment-accounts',
          disabled: true,
        },
      ],
    },
    {
      name: 'Life plan',
      path: '/life-plan',
      shouldShowInDrawer: true,
      shouldShowInMainMenu: true,
    },
    {
      name: 'Documents',
      path: '/documents',
      shouldShowInDrawer: true,
      shouldShowInMainMenu: true,
      disabled: true,
    },
    {
      name: 'Help & Support',
      path: '/help-support',
      shouldShowInDrawer: true,
      shouldShowInMainMenu: true,
      disabled: true,
    },
    {
      name: 'Profile',
      path: '/profile',
      shouldShowInDrawer: true,
      shouldShowInMainMenu: false,
      childLinks: [
        {
          name: 'Logout',
          path: '/logout',
        },
      ],
    },
  ],
};

Default.args = defaultArgs;
