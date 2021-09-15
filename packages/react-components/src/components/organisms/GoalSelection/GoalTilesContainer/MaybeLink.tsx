import * as React from 'react';
import { GatsbyLinkNoDecoration } from '../GoalSelection.styles';

export interface MaybeLinkProps {
  to?: string;
  children?: React.ReactNode;
}

export default function MaybeLink({ to, children }: MaybeLinkProps) {
  if (to) {
    return <GatsbyLinkNoDecoration to={to}>{children}</GatsbyLinkNoDecoration>;
  }

  return <>{children}</>;
}
