import { Link } from 'gatsby';
import React from 'react';
import { Box, Card, CardContent, Typography } from '../../atoms';

interface StatusComponentProps {
  entityId?: string;
  goalStatusMessage?: string;
  objStatusMessage?: string;
  linkStatusMessage?: string;
}

const StatusComponent = ({
  entityId,
  goalStatusMessage,
  objStatusMessage,
  linkStatusMessage,
}: StatusComponentProps) => (
  <Box m={1}>
    <Card>
      <CardContent>
        {entityId && (
          <Typography variant="h5" gutterBottom>
            Entity ID:
            {entityId}
          </Typography>
        )}

        {goalStatusMessage && (
          <Typography variant="h5" gutterBottom>
            Goal Status:
            {goalStatusMessage}
          </Typography>
        )}

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

        <Link to="/gmvp/sim">Goto Projections</Link>
      </CardContent>
    </Card>
  </Box>
);

export default StatusComponent;
