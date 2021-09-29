import React from 'react';
import styled from 'styled-components';
import { Grid, Theme, FormControlLabel, Typography, Checkbox } from '../../atoms';

export const StyledGrid = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ theme }: { theme: Theme }) => `
    padding: ${theme.spacing(1.25)}px ${theme.spacing(1)}px ${theme.spacing(
    1.25
  )}px ${theme.spacing(0.5)}px;
  `}
`;

export const StyledCheckbox = styled(Checkbox)`
  ${({ theme }: { theme: Theme }) => `
    width:  ${theme.spacing(4.8)}px;
`}
`;

export const StyledContainer = styled.div`
  ${({ isMobile }: { isMobile: boolean }) => `
  display: inline-flex;
  ${
    isMobile &&
    `
  margin-top: 5px;
  margin-bottom: -10px;`
  }
  `}
`;

export const StyledInnerGrid = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ theme, isMobile }: { theme: Theme; isMobile: boolean }) => `
    height: ${isMobile ? 'unset' : `${theme.spacing(2)}px`}
  `}
`;

export const StyledRadioFormInput = styled(({ isMobile, ...props }) => (
  <FormControlLabel {...props} />
))`
  ${({ theme, isMobile }: { theme: Theme; isMobile: boolean }) => `
    border-radius: ${theme.spacing(1.5)}px;
    border: solid ${theme.spacing(0.2)}px ${theme.palette.grey[200]};
    height: ${isMobile ? 'unset' : '57px'};
    margin-bottom: 20px;
    ${
      isMobile &&
      `
      width: 100%;
    `
    }
    .MuiFormControlLabel-label {
      flex-grow: 1;
    }
    &.MuiFormControlLabel-root {
      margin-right: ${theme.spacing(2.5)}px;
      margin-left: 0;
    }
    .MuiCheckbox-colorSecondary:hover{
      background-color: unset;
    }
    :hover{
      background-color: rgba(0, 128, 255, 0.04);
    }
  `}
`;

export const StyledTypography = styled(Typography)`
  line-height: 1rem;
`;
