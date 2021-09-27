import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Carousel, { CarouselProps } from './index';
import { Card, Typography } from '../../atoms';

export default {
  title: 'Digital Hybrid/Molecules/Carousel',
  component: Carousel,
} as Meta;

const Template: Story<CarouselProps> = (args) => (
  <Carousel {...args}>
    <div>
      <Card>
        <Typography variant="h1" align="center">
          Test Content 1
        </Typography>
      </Card>
    </div>
    <div>
      <Card>
        <Typography variant="h1" align="center">
          Test Content 2
        </Typography>
      </Card>
    </div>
    <div>
      <Card>
        <Typography variant="h1" align="center">
          Test Content 3
        </Typography>
      </Card>
    </div>
  </Carousel>
);
export const Default = Template.bind({});

Default.args = {
  settings: {
    autoplay: true,
  },
};
