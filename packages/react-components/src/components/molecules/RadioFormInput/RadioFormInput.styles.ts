import styled from 'styled-components';
import { FormControlLabel } from '@material-ui/core';
import { Theme, Grid, Radio } from '../../atoms';

export const StyledGrid = styled(Grid)`
  ${({ theme }: { theme: Theme }) => `
    padding-top: ${theme.spacing(1)}px;
    padding-left: ${theme.spacing(1)}px;
  `}
`;

export const StyledRadio = styled(Radio)`
  ${() => `
    align-self: flex-start;
  `}
`;

export const StyledRadioFormInput = styled(FormControlLabel)`
  ${({ theme }: { theme: Theme }) => `
    border-radius: ${theme.spacing(1)}px;
    border: solid ${theme.spacing(0.2)}px ${theme.palette.grey[200]};
    padding: 6px 15px 16px 8px;
    min-width: 295px;
    margin: 0;
    
    .MuiFormControlLabel-label {
      flex-grow: 1;
      width: 100%;
    }
  `}
`;
