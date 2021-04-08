import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const ELEVATION = 3;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accountTypeCardContent: {
      // By default the last child of MUI's <CardContent /> has a 3x spacing
      // padding bottom. We ensure the padding is consistent with this.
      '&:last-child': {
        paddingBottom: theme.spacing(2),
      },
    },
  })
);
