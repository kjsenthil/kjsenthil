import * as React from 'react';
import { Typography } from '@tsw/react-components';

export interface SectionHeadingProps {
  text: string;
}

export default function SectionHeading({ text }: SectionHeadingProps) {
  return (
    <Typography color="primary" colorShade="dark2" variant="h4" component="h2">
      {text}
    </Typography>
  );
}
