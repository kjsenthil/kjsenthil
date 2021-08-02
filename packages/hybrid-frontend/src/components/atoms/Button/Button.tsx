import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps, Theme } from '@material-ui/core';
import styled, { css } from 'styled-components';
import CircularProgress from '../CircularProgress';

// TODO: consider allowing the use of Gatsby's Link for client side navigation
// without contaminating this component with framework specific detail
// https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/
export interface ButtonProps extends Omit<MUIButtonProps, 'color' | 'variant'> {
  color?: MUIButtonProps['color'] | 'gradient';
  variant?: 'contained' | 'dashed' | 'outlined';
  isLoading?: boolean;
  wrap?: 'nowrap' | 'wrap';
  isIcon?: boolean;
  isPill?: boolean;
}

const determineColorStyles = ({
  color,
  variant,
  palette,
}: ButtonProps & { palette: Theme['palette'] }) => {
  let style = ``;
  if (color !== 'gradient') {
    const mainColor = (palette[color] || { main: '#000' })[color === 'grey' ? '200' : 'main'];
    style = `color: ${mainColor};`;
    if (variant === 'outlined') {
      style += `border: 1px solid ${mainColor};`;
    } else if (variant === 'dashed') {
      style += `border: 1px dashed ${mainColor};`;
    } else if (variant === 'contained') {
      style = `
        background-color: ${mainColor};
        color: ${color === 'grey' ? palette.primary.dark2 : palette.common.white};
      `;
    }
  } else {
    style = `
      background-image: linear-gradient(241deg, #6a29ff, #5206a9);
      color: ${palette.common.white};
    `;
  }

  return style;
};

const determinePadding = ({ isPill, startIcon, isIcon, size }: ButtonProps) => {
  let style = `padding: `;

  if (isPill) {
    if (startIcon !== undefined) {
      style += '7px 20px 7px 12px';
    } else {
      style += '10px 20px';
    }
    return style;
  }

  if (isIcon) {
    style += '8px';
  } else if (size === 'small') {
    style += '6px 24px';
  } else {
    style += '12px 16px';
  }

  return style;
};

const StyledCircularProgress = styled(CircularProgress)`
  ${({ theme: { palette } }) => css`
    color: ${palette.common.white};
  `}
`;

const BaseButton = styled(({ isIcon, color, isPill, wrap, ...props }) => (
  <MUIButton {...props} disableElevation />
))`
  ${({
    color,
    variant,
    isPill,
    startIcon,
    wrap = 'wrap',
    theme: {
      typography: { pxToRem },
      palette,
    },
    size,
    isIcon,
  }) => {
    const colorStyles = determineColorStyles({ palette, variant, color });
    const paddingStyle = determinePadding({ isIcon, isPill, startIcon, size });

    let height = isPill ? '38px' : '40px';
    if (size === 'small') {
      height = '28px';
    }
    return css`
      font-size: ${pxToRem(12)};
      ${colorStyles};

      &.Mui-disabled {
        ${colorStyles};
        opacity: 0.2;
      }

      .MuiButton-iconSizeMedium {
        *:first-child {
          font-size: ${isPill ? pxToRem(24) : pxToRem(14)};
        }
      }

      line-height: ${pxToRem(16)};
      letter-spacing: ${pxToRem(0.29)};
      font-weight: bold;
      height: ${height};
      border-radius: ${isPill ? '21.5px' : '6px'};
      min-width: ${isIcon ? '40px' : '80px'};
      ${isIcon ? 'width: 40px' : ''};
      text-transform: none;
      white-space: ${wrap === 'wrap' ? 'break-space' : 'nowrap'};
      ${paddingStyle}
    `;
  }}
`;

const Button: React.FC<ButtonProps> = ({ children, isLoading, superstar, ...props }) => (
  <BaseButton
    variant="contained"
    isIcon={typeof children !== 'string'}
    {...props}
    color={props.color || 'primary'}
  >
    {isLoading ? <StyledCircularProgress size={20} /> : children}
  </BaseButton>
);

export default Button;
