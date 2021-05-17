import * as React from 'react';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import { Divider, Box, Card, CardContent, Grid, Typography, Spacer } from '../../atoms';

export interface SummaryPanelProps {
  totalValue: number;
  totalContributions: number;

  totalReturn: number;
  totalReturnPct: number;
  riseInTotalReturn: boolean;

  threeMonthsReturn: number;
  threeMonthsReturnPct: number;
  riseInThreeMonthsReturn: boolean;
}

export default function SummaryPanel({
  totalValue,
  totalContributions,
  totalReturn,
  totalReturnPct,
  riseInTotalReturn,
  threeMonthsReturn,
  threeMonthsReturnPct,
  riseInThreeMonthsReturn,
}: SummaryPanelProps) {
  return (
    <Card variant="elevation" elevation={4}>
      <CardContent>
        <Grid container spacing={3} alignItems="center" justify="space-between">
          <Grid item xs={12} sm={6}>
            <Grid container justify="space-around" spacing={1}>
              <Grid item>
                <Typography variant="sh4" color="grey" colorShade="dark1" gutterBottom>
                  TOTAL VALUE
                </Typography>
                <Typography variant="h4" color="primary" colorShade="dark2">
                  {formatCurrency(totalValue)}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="sh4" color="grey" colorShade="dark1" gutterBottom>
                  TOTAL CONTRIBUTIONS
                </Typography>
                <Typography variant="sh1">{formatCurrency(totalContributions)}</Typography>
              </Grid>

              <Grid item>
                <Typography variant="sh4" color="grey" colorShade="dark1" gutterBottom>
                  TOTAL RETURN
                </Typography>
                <Typography display="inline" variant="sh1">
                  {riseInTotalReturn && '+'} {formatCurrency(totalReturn)}
                </Typography>
                <Box
                  bgcolor={riseInTotalReturn ? 'success.main' : 'error.main'}
                  m={1}
                  paddingX={1}
                  display="inline"
                  minHeight="25%"
                  borderRadius={2}
                >
                  <Typography variant="sh4" color="white" display="inline">
                    {formatPercent(totalReturnPct)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Grid container justify="flex-end">
              <Divider />
              <Spacer x={4} />
              <Grid item>
                <Typography variant="sh4" color="grey" colorShade="dark1" gutterBottom>
                  LAST 3 MONTHS RETURN
                </Typography>

                <Typography display="inline" variant="sh1">
                  {riseInThreeMonthsReturn && '+'} {formatCurrency(threeMonthsReturn)}
                </Typography>
                <Box
                  bgcolor={riseInThreeMonthsReturn ? 'success.main' : 'error.main'}
                  m={1}
                  paddingX={1}
                  display="inline"
                  minHeight="25%"
                  borderRadius={2}
                >
                  <Typography variant="sh4" color="white" display="inline">
                    {formatPercent(threeMonthsReturnPct)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
