import * as React from 'react';
import {
  ButtonBase as MUIButtonBase,
  ButtonBaseProps as MUIButtonBaseProps,
  Typography,
  TypographyProps,
} from '../../../atoms';

type TabComponentTypographyProps = Omit<TypographyProps, 'color' | 'colorShade'>;

export interface TabComponentProps extends Omit<MUIButtonBaseProps, 'component'> {
  labelProps?: TabComponentTypographyProps;
}

const defaultLabelProps: TabComponentTypographyProps = {
  variant: 'h2',
};

// By default, the tab component is MUI's standard ButtonBase. We want to
// change this to ButtonBase with Typography.
// In addition, we need to do this forwardRef per MUI's documentation. See the
// 'component' prop in the link below:
// https://material-ui.com/api/button-base/#props
const TabComponent = React.forwardRef(
  ({ component, children, labelProps, ...rest }: TabComponentProps, ref) => {
    const labelPropsWithDefault = {
      ...defaultLabelProps,
      ...labelProps,
    };

    return (
      <MUIButtonBase ref={ref} {...rest}>
        <Typography color="inherit" {...labelPropsWithDefault}>
          {children}
        </Typography>
      </MUIButtonBase>
    );
  }
);

export default TabComponent;
