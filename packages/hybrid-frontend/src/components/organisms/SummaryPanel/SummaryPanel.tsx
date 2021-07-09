import * as React from 'react';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import { Divider, Box, Grid, Typography, Spacer } from '../../atoms';
import CustomCard from './SummaryPanel.styles';

export interface SummaryValuesProps {
  totalValue: number;
  totalNetContributions: number;

  totalReturn: number;
  totalReturnPct: number;

  threeMonthsReturn?: number;
  threeMonthsReturnPct?: number;
}

export default function SummaryPanel({
  totalValue,
  totalNetContributions,
  totalReturn,
  totalReturnPct,
  threeMonthsReturn,
  threeMonthsReturnPct,
}: SummaryValuesProps) {
  return (
    <CustomCard>
      <Grid container spacing={3} alignItems="center" justify="space-between">
        <Grid item xs={12} sm={threeMonthsReturn ? 6 : 12}>
          <Grid container justify="space-evenly">
            <Grid item>
              <Typography variant="sh4" color="grey" colorShade="dark1" gutterBottom>
                TOTAL VALUE
              </Typography>
              <Typography variant="h4" color="primary" colorShade="dark2">
                {formatCurrency(totalValue)}
              </Typography>
            </Grid>
            <Spacer x={1} />
            <Divider />
            <Spacer x={1} />
            <Grid item>
              <Typography variant="sh4" color="grey" colorShade="dark1" gutterBottom>
                NET CONTRIBUTIONS
              </Typography>
              <Typography variant="sh1">{formatCurrency(totalNetContributions)}</Typography>
            </Grid>
            <Spacer x={1} />
            <Divider />
            <Spacer x={1} />
            <Grid item>
              <Typography variant="sh4" color="grey" colorShade="dark1" gutterBottom>
                TOTAL RETURN
              </Typography>
              <Typography display="inline" variant="sh1">
                {formatCurrency(totalReturn, { displayPlus: true })}
              </Typography>
              <Box
                bgcolor={totalReturn >= 0 ? 'success.main' : 'error.main'}
                m={1}
                paddingX={1}
                display="inline"
                minHeight="25%"
                borderRadius={2}
              >
                <Typography variant="sh4" color="white" display="inline">
                  {formatPercent(totalReturnPct / 100)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={3}>
          {threeMonthsReturn && (
            <Grid container justify="flex-end">
              <Divider />
              <Spacer x={4} />
              <Grid item>
                <Typography variant="sh4" color="grey" colorShade="dark1" gutterBottom>
                  LAST 3 MONTHS RETURN
                </Typography>

                <Typography display="inline" variant="sh1">
                  {formatCurrency(threeMonthsReturn, { displayPlus: true })}
                </Typography>
                <Box
                  bgcolor={threeMonthsReturn > 0 ? 'success.main' : 'error.main'}
                  m={1}
                  paddingX={1}
                  display="inline"
                  minHeight="25%"
                  borderRadius={2}
                >
                  {threeMonthsReturnPct && (
                    <Typography variant="sh4" color="white" display="inline">
                      {formatPercent(threeMonthsReturnPct)}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </CustomCard>
  );
}
