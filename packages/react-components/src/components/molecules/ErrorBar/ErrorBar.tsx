import React from 'react';
import { Box, Typography } from '../../atoms';

export interface ErrorBarProps {
  errorMessage: string;
}

const ErrorBar = ({ errorMessage }) => (
  <Box sx={{ bgcolor: 'error.main' }} py={2}>
    <Typography variant="sh5" color="white" align="center">
      {errorMessage}
    </Typography>
  </Box>
);
export default ErrorBar;
