import * as React from 'react';

/**
 * The PropsComparator and the ReactTypedMemo function allow us to use generic
 * with React.memo components.
 *
 * Details here:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087#issue-471892907
 */

export type PropsComparator<C extends React.ComponentType> = (
  prevProps: Readonly<React.ComponentProps<C>>,
  nextProps: Readonly<React.ComponentProps<C>>
) => boolean;

export function TypedReactMemo<C extends React.ComponentType<any>>(
  Component: C,
  propsComparator?: PropsComparator<C>
) {
  return (React.memo(Component, propsComparator) as any) as C;
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
