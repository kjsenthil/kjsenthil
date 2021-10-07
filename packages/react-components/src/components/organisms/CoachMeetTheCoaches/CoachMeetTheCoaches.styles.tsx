import React from 'react';
import styled, { css } from 'styled-components';
import { Theme, Box, Grid } from '../../atoms';

export const StyledBox = styled(({ isMobile, ...props }) => <Box {...props} />)`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => css`
    background-color: ${theme.palette.grey['100']};
    max-width: 1440px;
    padding-top: ${isMobile ? theme.spacing(5) : theme.spacing(8.75)}px;
    padding-bottom: ${isMobile ? theme.spacing(6) : theme.spacing(10)}px;
    
      .slick-dots {
        padding-right: ${theme.spacing(2)}px;
        padding-bottom: ${theme.spacing(0.7)}px;
        ${
          !isMobile &&
          `
          bottom: unset;
          margin-top: ${theme.spacing(3)}px;
          `
        }
      }
      .slick-dots li {
        margin: 0 1.5px;
        width: 6px;
        height: 7px;
      }

      .slick-dots li button:before {
        font-size: ${theme.spacing(1)}px;
      }

    }
  `}
`;

export const StyledImageContainer = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    display: flex;
    justify-content: center;
    margin-bottom: ${theme.spacing(1.5)}px;
    margin-top: ${theme.spacing(1)}px;
  `}
`;

export const StyledBioContainer = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    max-width: 300px;
    text-align: center;
    margin: auto;
    margin-bottom: ${theme.spacing(1)}px;
  `}
`;

export const StyledGrid = styled(({ ...props }) => <Grid {...props} />)`
  ${({ theme }: { theme: Theme }) => css`
    padding-left: ${theme.spacing(1.75)}px;
    padding-right: ${theme.spacing(3.5)}px;
  `}
`;
