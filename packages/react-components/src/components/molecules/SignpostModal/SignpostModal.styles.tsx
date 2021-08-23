import React from 'react';
import styled, { css } from 'styled-components';
import { Box, Paper, Theme, Typography, TypographyProps } from '../../atoms';

export const StyledPaper = styled((props) => <Paper {...props} />)`
  ${({ theme }: { theme: Theme }) => css`
    max-width: ${theme.spacing(50)}px;
    padding: ${theme.spacing(0.5)}px;
    background-color: ${theme.palette.background.paper};
    border-radius: 12px;
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.07);
  `}
`;

export const StyledBox = styled((props) => <Box {...props} />)`
  max-height: 169px;
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-template-rows: 0.75fr 1.5fr 0.5fr;
  ${({ theme }: { theme: Theme }) => css`
    padding: ${theme.spacing(1)}px;
  `}
`;

interface GridItemProps {
  colStart: number;
  colWidth: number;
  rowStart?: number;
  rowHeight?: number;
  alignSelf?: 'start' | 'end' | 'center' | 'stretch';
}
export const GridItem = styled.div`
  ${({ colStart, colWidth, rowStart, rowHeight, alignSelf }: GridItemProps) => {
    const hasRowProps = rowStart && rowHeight;
    const rowStartCss = hasRowProps
      ? css`
          grid-row: ${rowStart} / span ${rowHeight};
        `
      : '';

    return css`
      grid-column: ${colStart} / span ${colWidth};
      align-self: ${alignSelf || 'start'};
      ${rowStartCss}
    `;
  }}
`;

export const ModalTitle = styled((props: TypographyProps) => (
  <Typography variant="h4" {...props} />
))`
  color: #6724f2;
`;
