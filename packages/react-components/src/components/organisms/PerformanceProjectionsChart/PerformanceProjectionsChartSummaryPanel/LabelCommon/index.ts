import styled from 'styled-components';
import { Palette, PaletteColor } from '@material-ui/core/styles/createPalette';
import { Theme } from '../../../../atoms';

// eslint-disable-next-line import/prefer-default-export
export const PathLabelSquare = styled.div`
  ${({
    theme,
    color = 'grey',
    colorOptions = 'main',
  }: {
    theme: Theme;
    color?: keyof Palette;
    colorOptions?: keyof PaletteColor;
  }) => `
    width: ${theme.typography.pxToRem(5)};
    height: ${theme.typography.pxToRem(3)};
    border-radius: 1.5px;
    background-color: ${theme.palette[color][colorOptions]};
  `}
`;
