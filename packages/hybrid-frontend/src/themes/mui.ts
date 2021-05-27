import { createMuiTheme, colors } from '@material-ui/core';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import * as CSS from 'csstype';
import { digitalHybridColors } from './colors';

import Fonts from '../assets/fonts';

type FontWeight = 'normal' | 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

const FONT_NAME = 'FSElliot';

const createFontFace = (
  fontName: string,
  font: Buffer,
  fontWeight: FontWeight
): CSS.AtRule.FontFace => ({
  fontFamily: fontName,
  fontStyle: 'normal',
  fontStretch: 'normal',
  fontDisplay: 'swap',
  fontWeight,
  src: `local('${fontName}'),
      url(${font}) format('openType')
    `,
});

const fsElliot = createFontFace(FONT_NAME, Fonts.FSElliot, 'normal');
const fsElliotBold = createFontFace(FONT_NAME, Fonts.FSElliotBold, 'bold');
const fsElliotHeavy = createFontFace(FONT_NAME, Fonts.FSElliotHeavy, 900);

const digitalHybridTheme = createMuiTheme({
  typography: {
    fontFamily: ['FSElliot', 'Roboto'].join(','),
  },

  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white,
      layout: digitalHybridColors.bg.main,
    },

    primary: {
      ...digitalHybridColors.purple,
      light: digitalHybridColors.purple.light1,
      dark: digitalHybridColors.purple.dark1,
    },

    secondary: {
      ...digitalHybridColors.blue,
      light: digitalHybridColors.blue.light1,
      dark: digitalHybridColors.blue.dark1,
    },

    tertiary: {
      ...digitalHybridColors.teal,
      light: digitalHybridColors.teal.light1,
      dark: digitalHybridColors.teal.dark1,
    },

    grey: {
      ...digitalHybridColors.grey,
      100: digitalHybridColors.grey.light2,
      200: digitalHybridColors.grey.light1,
      300: digitalHybridColors.grey.main,
      400: digitalHybridColors.grey.dark1,
      500: digitalHybridColors.grey.dark2,
    },

    gold: {
      main: digitalHybridColors.gold.main,
    },

    success: {
      main: digitalHybridColors.success.main,
    },

    error: {
      main: digitalHybridColors.error.main,
    },

    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [fsElliot, fsElliotBold, fsElliotHeavy],
        html: {
          letterSpacing: '0.29px',
        },
        button: {
          letterSpacing: '0.29px',
        },
      },
    },
  },
});

export default digitalHybridTheme;
