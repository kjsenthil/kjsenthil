import React from 'react';
import { Grid } from '@material-ui/core';
import { useBreakpoint } from '@tswdts/react-components/src';
import { LeftContainer, PageContainer, RightContainer } from './FiftyFiftyPageTemplate.styles';

export interface FiftyFiftyPageTemplateProps {
  contentLeft: React.ReactNode;
  contentRight: React.ReactNode;
}

const FiftyFiftyPageTemplate = ({ contentLeft, contentRight }: FiftyFiftyPageTemplateProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12} md={6}>
          <LeftContainer>{contentLeft}</LeftContainer>
        </Grid>
        {!isMobile && (
          <Grid item md={6}>
            <RightContainer>{contentRight}</RightContainer>
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default FiftyFiftyPageTemplate;
