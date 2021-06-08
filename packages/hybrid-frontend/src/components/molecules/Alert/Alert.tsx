import React from 'react';
import { Alert as MUIAlert, AlertProps as MUIAlertProps } from '@material-ui/lab';
import styled from 'styled-components';
import { Icon, Theme, Typography } from '../../atoms';
import { IconProps } from '../../atoms/Icon';

export const StyledAlert = styled(MUIAlert)`
  ${({ theme, severity }: { theme: Theme; severity: 'success' | 'error' }) => `
    border: 1px solid ${theme.palette[severity].main};
    background-color: ${theme.palette.background.default};
    border-radius: 0 ${theme.typography.pxToRem(16)} ${theme.typography.pxToRem(16)};
    width: 100%;
    padding: 0 ${theme.typography.pxToRem(10)};
  `}
`;
export const AlertTypography = styled(Typography)`
  padding-top: 3px;
`;
export interface AlertProps extends Omit<MUIAlertProps, 'severity'> {
  severity: 'success' | 'error';
}
const alertIcons: Record<string, IconProps['name']> = {
  success: 'successTick',
  error: 'errorCircle',
};
const Alert: React.FC<AlertProps> = ({ ...props }) => (
  <StyledAlert {...props} icon={<Icon name={alertIcons[props.severity]} />}>
    <AlertTypography variant="sh3" color="primary" colorShade="dark2">
      {props.children}
    </AlertTypography>
  </StyledAlert>
);
export default Alert;
