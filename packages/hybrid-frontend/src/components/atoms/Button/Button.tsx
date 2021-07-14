import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps, Theme } from '@material-ui/core';
import styled, { css } from 'styled-components';
import CircularProgress from '../CircularProgress';

// TODO: consider allowing the use of Gatsby's Link for client side navigation
// without contaminating this component with framework specific detail
// https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/
export interface ButtonProps extends Omit<MUIButtonProps, 'color'> {
  color?: MUIButtonProps['color'] | 'gradient';
  isLoading?: boolean;
  wrap?: 'nowrap' | 'wrap';
  isIcon?: boolean;
}

const determineColorStyles = ({
  color,
  variant,
  palette,
}: ButtonProps & { palette: Theme['palette'] }) => {
  let style = ``;
  if (color !== 'gradient') {
    const mainColor = (palette[color] || { main: '#000' }).main;
    style = `color: ${mainColor};`;
    if (variant === 'outlined') {
      style += `border: 1px solid ${mainColor};`;
    } else if (variant === 'contained') {
      style = `
        background-color: ${mainColor};
        color: ${palette.common.white};
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

const StyledCircularProgress = styled(CircularProgress)`
  ${({ theme: { palette } }) => css`
    color: ${palette.common.white};
  `}
`;

const BaseButton = styled(({ isIcon, color, wrap, ...props }) => (
  <MUIButton {...props} disableElevation />
))`
  ${({
    color,
    variant,
    wrap = 'wrap',
    theme: {
      typography: { pxToRem },
      palette,
    },
    size,
    isIcon,
  }) => {
    const colorStyles = determineColorStyles({ palette, variant, color });
    return css`
      font-size: ${pxToRem(12)};
      ${colorStyles};

      &.Mui-disabled {
        ${colorStyles};
        opacity: 0.2;
      }

      .MuiButton-iconSizeMedium {
        *:first-child {
          font-size: ${pxToRem(14)};
        }
      }

      line-height: ${pxToRem(16)};
      letter-spacing: ${pxToRem(0.29)};
      font-weight: bold;
      height: ${size === 'small' ? '28px' : '40px'};
      border-radius: 6px;
      min-width: ${isIcon ? '40px' : '80px'};
      ${isIcon ? 'width: 40px' : ''};
      padding: ${isIcon ? '8px' : '12px 16px'};
      padding: ${size === 'small' ? '6px 24px' : '12px 16px'};
      text-transform: none;
      white-space: ${wrap === 'wrap' ? 'break-space' : 'nowrap'};
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
