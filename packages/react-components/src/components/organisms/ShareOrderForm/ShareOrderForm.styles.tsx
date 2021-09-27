import styled, { css } from 'styled-components';
import { Theme, Box, Grid, Icon } from '../../atoms';

export const StyledRadioGroup = styled(Grid)`
  margin-right: 0;
  display: grid;
  width: 100%;
`;

export const StyledContactBox = styled(Box)`
  ${({ theme }: { theme: Theme }) => css`
    display: flex;
    padding: 15px;
    border-radius: 10px;
    background-color: ${theme.palette.grey['100']};
  `}
`;

export const StyledIcon = styled(Icon)`
  ${({ theme }) => css`
    stroke: ${theme.palette.primary.main};
    stroke-width: 1;
  `}
`;
