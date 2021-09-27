import React from 'react';
import { Grid } from '@material-ui/core';
import { useBreakpoint } from '@tswdts/react-components/src';
import { LeftContainer, PageContainer, RightContainer } from './FiftyFiftyPageTemplate.styles';

export interface HalfPageContent {
  children: React.ReactNode;
}

export interface FiftyFiftyPageTemplateProps {
  contentLeft: HalfPageContent;
  contentRight: HalfPageContent;
}

const FiftyFiftyPageTemplate = ({ contentLeft, contentRight }: FiftyFiftyPageTemplateProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12} md={6}>
          <LeftContainer>{contentLeft.children}</LeftContainer>
        </Grid>
        {!isMobile && (
          <Grid item md={6}>
            <RightContainer>{contentRight.children}</RightContainer>
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default FiftyFiftyPageTemplate;
