import * as React from 'react';
import styled from 'styled-components';
import {
  Icon,
  IconProps,
  Spacer,
  SpacerProps,
  Tooltip,
  TooltipProps,
  Typography,
  TypographyProps,
  Theme,
} from '../../atoms';
import { StyleableComponent } from '../../../types';

export interface TypographyWithTooltipProps extends StyleableComponent {
  tooltip: string;
  tooltipSpace?: number; // Quick way to set the x-axis spacer distance
  children?: React.ReactNode;

  typographyProps?: TypographyProps;
  tooltipProps?: TooltipProps;
  iconProps?: Pick<IconProps, 'color'>;
  spacerProps?: SpacerProps;
}

const IconWrapper = styled.span`
  ${({ theme }: { theme: Theme }) => `
    vertical-align: text-top;
    color: ${theme.palette.grey['300']};
  `}
`;

export default function TypographyWithTooltip({
  tooltip,
  tooltipSpace = 1, // theme.spacing(1)
  children,
  typographyProps,
  tooltipProps,
  iconProps,
  spacerProps,
  className,
}: TypographyWithTooltipProps) {
  return (
    <Typography {...typographyProps} component="div" className={className}>
      {children}
      <Spacer x={tooltipSpace} inline {...spacerProps} />
      <Tooltip title={tooltip} {...tooltipProps}>
        <IconWrapper>
          <Icon
            aria-label="more information"
            name="infoCircleIcon"
            color="inherit"
            fontSize="inherit"
            {...iconProps}
          />
        </IconWrapper>
      </Tooltip>
    </Typography>
  );
}
