import React from 'react';
import { ToolbarProps } from '../../atoms';
import StyledToolBar from './SubHeader.styles';

export interface SubHeaderProps extends ToolbarProps {
  children: React.ReactNode;
}

const SubHeader = ({ children, ...props }: SubHeaderProps) => (
  <StyledToolBar {...props}>{children}</StyledToolBar>
);

export default SubHeader;
