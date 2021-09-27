import * as React from 'react';
import { ToggleButtonGroupProps } from '../../atoms';
import { StyledDescriptiveToggleButtonGroup } from './DescriptiveToggleButtonGroup.styles';
import { useBreakpoint } from '../../../hooks';

export type DescriptiveToggleButtonGroupProps = Omit<
  ToggleButtonGroupProps,
  'orientation' | 'color'
>;

export default function DescriptiveToggleButtonGroup({
  ...rest
}: DescriptiveToggleButtonGroupProps) {
  const { isMobile } = useBreakpoint();

  return (
    <StyledDescriptiveToggleButtonGroup orientation="vertical" isMobile={isMobile} {...rest} />
  );
}
