import styled, { css } from 'styled-components';
import { Icon, IconButton, Theme } from '../../atoms';

export const CardBody = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    column-gap: ${theme.spacing(2)}px;
    display: grid;
    flex: 1;
    grid: 20px 122px / 122px 1fr;
  `}
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const GoalValues = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    flex: 1;
    > * {
      display: inline-block;
    }
    h3:first-of-type {
      margin-right: ${theme.spacing(1)}px;
    }
  `}
`;

export const IconContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

export const DetailsContainer = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    /* fix for line height of nested inline paragaraph */
    line-height: 0;
    p:first-of-type {
      margin-bottom: ${theme.spacing(1.5)}px;
    }
  `}
`;

export const InfoIcon = styled(Icon)`
  ${({ theme }) => `
    color: ${theme.palette.grey.main};
    font-size: 0.75rem;
  `}
`;

export const StyledIconButton = styled(IconButton)`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => css`
    padding: 0;
    width: ${pxToRem(18)};
    height: ${pxToRem(18)};
  `}
`;

export const GoalIcon = styled.img`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => css`
    width: ${pxToRem(122)};
    height: ${pxToRem(122)};
    border-radius: 12px;
    object-fit: cover;
    object-position: center;
  `}
`;
