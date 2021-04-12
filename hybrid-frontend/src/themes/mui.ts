import { createMuiTheme, colors } from '@material-ui/core';
import { digitalHybridColors } from './colors';

const digitalHybridTheme = createMuiTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white,
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

    teal: {
      ...digitalHybridColors.teal,
      light: digitalHybridColors.teal.light1,
      dark: digitalHybridColors.teal.dark1,
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
});

export default digitalHybridTheme;
