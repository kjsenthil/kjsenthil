import styled, { css } from 'styled-components';
import { Card, Theme, Box, Grid, Icon } from '../../atoms';

export const ShareOrderFormStyledCard = styled(Card)`
  ${({ theme }: { theme: Theme }) => css`
    border: 1px solid ${theme.palette.grey['200']};
    border-radius: 16px;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    min-height: ${theme.typography.pxToRem(165)};
    padding: ${theme.spacing(2)}px;
    width: 400px;

    .MuiInputLabel-root {
      font-size: 14px;
      padding-top: 5px;
      margin-left: -5px;
    }
  `}
`;

export const StyledRadioGroup = styled(Grid)`
  ${({ theme }: { theme: Theme }) => css`
    margin: ${theme.spacing(1.2)}px;
    margin-right: 0;
    display: grid;
    width: 370px;
  `}
`;

export const StyledContactBox = styled(Box)`
  ${({ theme }: { theme: Theme }) => css`
    display: flex;
    margin: 15px 0px;
    padding: 15px;
    border-radius: 10px;
    background-color: ${theme.palette.grey['100']};
  `}
`;

export const StyledIcon = styled(Icon)`
  ${({ theme }) => `
    margin-right: ${theme.spacing(2)}px;
    stroke: ${theme.palette.primary.main};
    stroke-width: 1;
  `}
`;
