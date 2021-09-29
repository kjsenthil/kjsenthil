import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Typography } from '@material-ui/core';
import LinkWithInfo, { LinkWithInfoProps } from './LinkWithInfo';

export default {
  title: 'Digital Hybrid/Molecules/Link With Info',
  component: LinkWithInfo,
} as Meta;

const Template: Story<LinkWithInfoProps> = (args) => <LinkWithInfo {...args} />;

const defaultArgs: LinkWithInfoProps = {
  linkText: 'Title',
  renderInfo: <Typography>Header</Typography>,
};

export const Default = Template.bind({});

Default.args = defaultArgs;
