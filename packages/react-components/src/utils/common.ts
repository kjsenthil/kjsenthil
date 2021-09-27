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

/**
 * If T is a type with optional field f, Require<T, 'f'> results in a copy of T where f is required.
 * Like Required<T> but to mark specific fields as required.
 */
export type Require<T, K extends keyof T> = Pick<Required<T>, K> & Omit<T, K>;

export type PartialPick<T, K extends keyof T> = {
  [P in K]?: T[P];
};
