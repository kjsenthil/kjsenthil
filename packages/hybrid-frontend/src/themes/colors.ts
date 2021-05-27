/**
 * This file contains various color schemes intended to be used by a
 * Material-UI theme when constructing color palette.
 */
import { SimplePaletteColorOptions } from '@material-ui/core';

export type CustomColors = Record<string, SimplePaletteColorOptions>;

export const digitalHybridColors: CustomColors = {
  purple: {
    main: '#6c00bf',
    light1: '#a64dff',
    light2: '#cfadff',
    dark1: '#4a0082',
    dark2: '#380c57',
  },

  blue: {
    main: '#0080ff',
    light1: '#23acff',
    light2: '#9ddaff',
    dark1: '#0021ec',
    dark2: '#00127f',
  },

  teal: {
    main: '#00c4bd',
    light1: '#00e8d9',
    light2: '#a5f2ec',
    dark1: '#009492',
    dark2: '#00585e',
  },

  grey: {
    main: '#aeaabf',
    light1: '#dddaed',
    light2: '#eeedfc',
    dark1: '#6a6775',
    dark2: '#393840',
  },

  white: { main: '#ffffff' },
  bg: { main: '#f9fafc' },
  gold: { main: '#ebb300' },
  success: { main: '#3dd598' },
  error: { main: '#eb3a17' },
};
