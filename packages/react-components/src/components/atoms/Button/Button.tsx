import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps, Theme } from '@material-ui/core';
import styled, { css } from 'styled-components';
import CircularProgress from '../CircularProgress';

// TODO: consider allowing the use of Gatsby's Link for client side navigation
// without contaminating this component with framework specific detail
// https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/
export interface ButtonProps extends Omit<MUIButtonProps, 'color' | 'variant'> {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'gradient'
    | 'grey'
    | 'white'
    | 'error';
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
    const mainColor = ((color && palette[color]) || { main: '#000' })[
      color === 'grey' ? '200' : 'main'
    ];
    style = `color: ${mainColor};`;
    if (variant === 'outlined') {
      style += `border: 1px solid ${mainColor};`;
    } else if (variant === 'dashed') {
      style += `border: 1px dashed ${mainColor};`;
    } else if (variant === 'contained') {
      if (color === 'white') {
        style = `
        background-color: ${palette.common.white};
        color: ${palette.primary.main};

        &:hover {
          background-color: ${palette.common.white};
          filter: brightness(90%);
        }
      `;
      } else {
        const textColor = color === 'grey' ? palette.primary.dark2 : palette.common.white;

        style = `
        background-color: ${mainColor};
        color: ${textColor};
        
        &:hover {
          background-color: ${mainColor};
          color: ${textColor};
        }
      `;
      }
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

const ButtonNoElevation = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, isPill, isIcon, variant, ...props }, ref) => (
    <MUIButton {...props} ref={ref} disableElevation />
  )
);

const BaseButton = styled(ButtonNoElevation)`
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
  }: ButtonProps & { theme: Theme }) => {
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, isIcon, ...props }, ref) => (
    <BaseButton
      variant="contained"
      isIcon={isIcon === undefined ? typeof children !== 'string' : isIcon}
      {...props}
      ref={ref}
      color={props.color || 'primary'}
    >
      {isLoading ? <StyledCircularProgress size={20} /> : children}
    </BaseButton>
  )
) as React.FC<ButtonProps>;

export default Button;
