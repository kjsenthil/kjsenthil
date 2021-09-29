import styled, { css } from 'styled-components';
import { Theme, Link, Box } from '../../atoms';

export const StyledLink = styled(Link)`
  ${() => css`
    text-decoration: underline;
  `}
`;

export const InfoBox = styled(Box)`
  ${({ theme }: { theme: Theme }) => css`
    color: ${theme.palette.primary.main};
    padding: ${theme.spacing(0)}px ${theme.spacing(2)}px;
    margin-top: ${theme.spacing(2)}px;

    border: 1px solid ${theme.palette.grey['200']};
    background-color: ${theme.palette.grey['100']};
    border-radius: ${theme.spacing(1)}px;
  `}
`;

export const DividerTriangle = styled.div`
  ${({ theme }: { theme: Theme }) => `
    width: ${theme.spacing(1.5)}px;
    height: ${theme.spacing(1.5)}px;

    border-top: ${theme.spacing(0.2)}px solid ${theme.palette.grey['200']};
    border-right: ${theme.spacing(0.2)}px solid ${theme.palette.grey['200']};
    background-color: ${theme.palette.grey['100']};
    
    transform: translate(${theme.spacing(1.5)}px, -6px) rotate(-45deg);
    transition: transform 0.2s ease-in;
  `}
`;
