import { LinearProgress as MUILinearProgress, LinearProgressProps } from '@material-ui/core';
import styled, { css } from 'styled-components';

export type { LinearProgressProps };

const StyledLinearProgress = styled(MUILinearProgress)`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
  }) => css`
    background: ${palette.grey.light2};
    height: ${pxToRem(8)};

    .MuiLinearProgress-barColorPrimary {
      border-radius: 4px;
      background-image: linear-gradient(269deg, #6a29ff, #5206a9);
    }

    .MuiLinearProgress-bar1Indeterminate {
      animation-duration: 3.15s;
    }

    .MuiLinearProgress-bar2Indeterminate {
      animation-duration: 3.15s;
      animation-delay: 1.725s;
    }
  `}
`;

export default StyledLinearProgress;
