import * as React from 'react';
import Typography from '../Typography';

export interface NumberedProgressProps {
  progress: string;
  total: string;
}

export default function NumberedProgress({ progress, total }: NumberedProgressProps) {
  const renderText = `${progress} of ${total}`;

  return (
    <Typography variant="sh3" colorShade="light1">
      {renderText}
    </Typography>
  );
}
