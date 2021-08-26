import styled, { css } from 'styled-components';
import { Theme } from '@material-ui/core';
import { TypographyWithTooltip } from '../../molecules';
import { Typography } from '../../atoms';
import { GoalState } from './goalState';

export enum GoalProgressCardStyle {
  'simple',
  'detailed',
}

export const Layout = styled.div`
  ${({
    theme,
    isMobile,
    goalState,
    width = '100%',
  }: {
    theme: Theme;
    isMobile: boolean;
    goalState: GoalState;
    width?: string;
  }) => {
    const borderColor =
      // @ts-ignore Error finding theme.palette.grey.light1
      goalState === GoalState.FINISHED ? theme.palette.tertiary.light1 : theme.palette.grey.light1;
    return css`
      min-height: 240px;
      max-width: ${width};
      display: flex;
      flex-flow: ${isMobile ? 'column' : 'row'} nowrap;
      overflow: hidden;
      background: ${theme.palette.background.default};
      border: 1px solid ${borderColor};
      border-radius: 12px;
    `;
  }}
`;

export const IconContainer = styled.div`
  ${({ isMobile, iconSrc }: { isMobile: boolean; iconSrc: string }) => css`
    flex: 0 0 ${isMobile ? '120px;' : '150px'};
    background-image: url(${iconSrc});
    background-size: cover;
    background-position: center;
  `}
`;

export const GoalDetailsContainer = styled.div`
  ${({
    theme,
    isMobile,
    cardStyle,
  }: {
    theme: Theme;
    isMobile: boolean;
    cardStyle: GoalProgressCardStyle;
  }) => {
    const { spacing } = theme;
    let margin = `${spacing(2.5)}px`; // mobile, simple
    if (isMobile) {
      if (cardStyle === GoalProgressCardStyle.detailed) {
        // mobile, detailed
        margin = `${spacing(1.5)}px ${spacing(1.5)}px ${spacing(2.5)}px ${spacing(1.5)}px`;
      }
    } else if (cardStyle === GoalProgressCardStyle.detailed) {
      // desktop, detailed
      margin = `${spacing(2.5)}px ${spacing(3)}px ${spacing(2)}px ${spacing(3)}px`;
    } else {
      // desktop, simplified
      margin = `${spacing(2.5)}px ${spacing(3)}px ${spacing(4)}px ${spacing(3)}px`;
    }
    return css`
      flex: 1 1 auto;
      display: flex;
      flex-flow: column wrap;
      margin: ${margin};
    `;
  }}
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const GoalStatus = styled(TypographyWithTooltip)`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing(1.5)}px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: ${theme.typography.pxToRem(0.2)};
  `}
`;

export const Totals = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    column-gap: ${theme.spacing(1)}px;
    margin-bottom: ${theme.spacing(1.5)}px;
  `}
`;

export const Description = styled(Typography)`
  ${({
    theme,
    $isMobile,
    $cardStyle,
  }: {
    theme: Theme;
    $isMobile: boolean;
    $cardStyle: GoalProgressCardStyle;
  }) => {
    let margin = `${theme.spacing(4)}px`;
    if ($isMobile) {
      margin =
        $cardStyle === GoalProgressCardStyle.simple
          ? `${theme.spacing(2.5)}px`
          : `${theme.spacing(1.5)}px`;
    }
    return css`
      margin-bottom: ${margin};
    `;
  }}
`;

export const Target = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    column-gap: ${theme.spacing(0.5)}px;
    margin-bottom: ${theme.spacing(1)}px;
    text-transform: uppercase;
  `}
`;
