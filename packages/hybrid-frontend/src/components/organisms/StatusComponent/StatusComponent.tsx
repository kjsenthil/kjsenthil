import React from 'react';
import { Box, Card, CardContent, Spacer, Typography } from '../../atoms';

interface StatusComponentProps {
  goalStatusMessage?: string;
  objStatusMessage?: string;
  linkStatusMessage?: string;
}

const StatusComponent = ({
  goalStatusMessage,
  objStatusMessage,
  linkStatusMessage,
}: StatusComponentProps) => (
  <Box m={1}>
    <Card>
      <CardContent>
        {goalStatusMessage && (
          <Typography variant="h5" gutterBottom>
            Goal Status:
            {goalStatusMessage}
          </Typography>
        )}

        <Spacer y={2} />

        {objStatusMessage && (
          <Typography variant="h5" gutterBottom>
            Objective Status:
            {objStatusMessage}
          </Typography>
        )}

        {linkStatusMessage && (
          <Typography variant="h5" gutterBottom>
            Final Link Status:
            {linkStatusMessage}
          </Typography>
        )}
      </CardContent>
    </Card>
  </Box>
);

export default StatusComponent;
