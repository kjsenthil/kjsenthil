import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { AssetData } from '../../api/getAssetDetail';
import Grid from '@material-ui/core/Grid';

interface AssetDetailsProps {
  data: AssetData;
}

const StyledPaper = styled(Paper)`
  padding: .5rem;
`;

const StyledCheckIcon = styled(CheckCircleIcon)`
  padding-right: .25rem;
`;

const AssetDetails: React.FC<AssetDetailsProps> = ({ data: { assetName, isaEligible, sippEligible, unitType } }) => {
  const unitTypeText = unitType === 'Acc' ? 'Accumulation' : 'Income';

  return (
    <StyledPaper>
      <Typography variant="h5" component="h2" gutterBottom>{assetName}</Typography>
      <Typography variant="body2" color="textSecondary" component="div">
        {unitTypeText}
        {isaEligible && (
        <Grid container direction="row" alignItems="center">
          <StyledCheckIcon color="primary" /> ISA Eligible
      </Grid>
        )}
        {sippEligible && (
        <Grid container direction="row" alignItems="center">
            <StyledCheckIcon color="primary" /> SIPP Eligible
        </Grid>
        )}
      </Typography>
    </StyledPaper>
  );
};

export default AssetDetails;
