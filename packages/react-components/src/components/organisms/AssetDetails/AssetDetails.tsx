import React from 'react';
import styled from 'styled-components';
import { Paper, Typography, Grid, CheckCircleIcon } from '../../atoms';
import { AssetData } from '../../../services/assets';

interface AssetDetailsProps {
  data: AssetData;
}

const StyledPaper = styled(Paper)`
  margin-bottom: 2rem;
  padding: 0.5rem;
`;

const StyledCheckIcon = styled(CheckCircleIcon)`
  padding-right: 0.25rem;
`;

const AssetDetails: React.FC<AssetDetailsProps> = ({
  data: { assetName, isaEligible, sippEligible, unitType },
}) => {
  const unitTypeText = unitType === 'Acc' ? 'Accumulation' : 'Income';

  return (
    <StyledPaper>
      <Typography variant="h5" component="h2" gutterBottom>
        {assetName}
      </Typography>
      <Typography variant="b2" color="secondary" component="div">
        {unitTypeText}
        {isaEligible && (
          <Grid container direction="row" alignItems="center">
            <StyledCheckIcon color="primary" />
            ISA Eligible
          </Grid>
        )}
        {sippEligible && (
          <Grid container direction="row" alignItems="center">
            <StyledCheckIcon color="primary" />
            SIPP Eligible
          </Grid>
        )}
      </Typography>
    </StyledPaper>
  );
};

export default AssetDetails;
