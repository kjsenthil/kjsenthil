import React from 'react';
import styled, { css } from 'styled-components';
import { Box, Icon, Theme } from '../../atoms';

export const StyledBox = styled(({ isMobile, ...props }) => <Box {...props} />)`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => css`
      .slick-dots {
        padding-right: ${theme.spacing(2)}px;
        padding-bottom: ${theme.spacing(0.7)}px;
        ${
          !isMobile &&
          css`
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

export const StyledIcon = styled(Icon)`
  ${({ theme }) => css`
    color: ${theme.palette.primary.light1};
  `}
`;
