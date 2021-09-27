import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Typography } from '@tswdts/react-components/src';
import MainCard from '@tswdts/react-components/src/components/molecules/MainCard';
import styled from 'styled-components';
import FiftyFiftyPageTemplate, { FiftyFiftyPageTemplateProps } from './FiftyFiftyPageTemplate';

export default {
  title: 'Digital Hybrid/Templates/Fifty Fifty Page Template',
  component: FiftyFiftyPageTemplate,
  argTypes: {},
} as Meta;

const Template: Story<FiftyFiftyPageTemplateProps> = (args) => <FiftyFiftyPageTemplate {...args} />;

const RightContentContainer = styled.div`
  height: 100%;
  background: linear-gradient(213deg, #af61fe 11%, #7024fc 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftContentContainer = styled.div`
  background-color: white;
`;

const defaultArgs: FiftyFiftyPageTemplateProps = {
  contentLeft: {
    children: (
      <LeftContentContainer>
        <h2>Left content</h2>
        <Typography variant="b2" color="primary">
          The content to be displayed on the left. The content to be displayed on the left. The
          content to be displayed on the left. The content to be displayed on the left. The content
          to be displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left. The content to be
          displayed on the left. The content to be displayed on the left.
        </Typography>
      </LeftContentContainer>
    ),
  },

  contentRight: {
    children: (
      <RightContentContainer>
        <MainCard>
          <h2>Right content</h2>
          <Typography variant="b2" color="primary">
            The content to be displayed on the right
          </Typography>
        </MainCard>
      </RightContentContainer>
    ),
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.parameters = {
  layout: 'fullscreen',
};
