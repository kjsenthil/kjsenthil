import * as React from 'react';
import { Pill, PillProps, TabProps } from '../../../atoms';

type PillTabComponentProps = PillProps & TabProps;

export const PillsNavigationSelectableTabComponent = React.forwardRef<
  HTMLButtonElement,
  PillTabComponentProps
>((props, ref) => (
  <Pill
    variant={props['aria-selected'] ? 'selected' : 'selectable'}
    selectedColor="primary"
    isIcon={false}
    {...props}
    ref={ref}
  />
)) as React.FC<PillTabComponentProps>;

export const PillNavigationCreatorTabComponent = React.forwardRef<
  HTMLButtonElement,
  PillTabComponentProps
>((props, ref) => (
  <Pill variant="creator" selectedColor="primary" isIcon={false} {...props} ref={ref} />
)) as React.FC<PillTabComponentProps>;
