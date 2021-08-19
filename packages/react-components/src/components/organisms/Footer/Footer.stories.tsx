import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Footer from './Footer';

export default {
  title: 'Digital Hybrid/Organisms/Footer',
  component: Footer,
} as Meta;

const Template: Story = () => <Footer />;

export const Default = Template.bind({});
