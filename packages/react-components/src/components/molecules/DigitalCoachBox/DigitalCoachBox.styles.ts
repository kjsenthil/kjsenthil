import styled, { css } from 'styled-components';
import { Icon, Typography } from '../../atoms';

export const DigitalCoachBoxContainer = styled.div`
  ${({ theme }) => css`
    border: 2px dashed ${theme.palette.primary.light2};
    border-radius: 0 ${theme.spacing(2)}px ${theme.spacing(2)}px;
    padding: ${theme.spacing(1.5)}px;
  `}
`;

export const DigitalCoachIcon = styled(Icon)`
  ${({ theme }) => css`
    color: ${theme.palette.primary.main};
    height: ${theme.spacing(2)}px;
    margin-right: ${theme.spacing(0.5)}px;
    width: ${theme.spacing(2)}px;
  `}
`;

export const TitleContainer = styled.div`
  ${({ theme }) => css`
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    margin-bottom: ${theme.spacing(0.5)}px;
  `}
`;

export const Title = styled(Typography)`
  flex: 1;
`;
