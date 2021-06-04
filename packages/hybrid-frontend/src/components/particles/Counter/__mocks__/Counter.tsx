import * as React from 'react';
import { CounterProps } from '..';

const Counter = ({ value, valueFormatter }: CounterProps) => (
  <>{valueFormatter ? valueFormatter(value) : value}</>
);

export default Counter;
