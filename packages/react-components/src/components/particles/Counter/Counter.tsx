import * as React from 'react';
import { animated, useSpring } from '@react-spring/web';

export interface CounterProps {
  value: number;
  valueFormatter?: (num: number) => string;
}

const Counter = ({ value, valueFormatter }: CounterProps) => {
  const springProps = useSpring({ value, from: { value: 0 } });

  return (
    <animated.div>
      {valueFormatter ? springProps.value.to((val) => valueFormatter(val)) : springProps.value}
    </animated.div>
  );
};

export default Counter;
