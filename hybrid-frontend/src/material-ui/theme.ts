import { createMuiTheme, colors } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: colors.blue[500],
    },
    secondary: {
      main: colors.indigo[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
});

export default theme;