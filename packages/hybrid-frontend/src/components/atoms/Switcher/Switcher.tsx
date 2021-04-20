import React from 'react';
import { Switch as MUISwitcher, SwitchProps } from '@material-ui/core';
import styled from 'styled-components';

export interface SwitcherProps extends SwitchProps {
  withInnerLabel?: boolean;
}

const StyledSwitcher = styled(MUISwitcher)`
  ${({
    size,
    withInnerLabel,
    theme: {
      typography: { pxToRem },
      palette,
    },
  }) => {
    const SMALL_WIDTH = withInnerLabel ? 55 : 40;
    const LARGE_WIDTH = withInnerLabel ? 65 : 50;
    const SMALL_TRANSLATE_X = withInnerLabel ? 30 : 16;
    const LARGE_TRANSLATE_X = withInnerLabel ? 36 : 20;

    return `
      &.MuiSwitch-root {
        width: ${size === 'small' ? pxToRem(SMALL_WIDTH) : pxToRem(LARGE_WIDTH)};
        height: ${size === 'small' ? pxToRem(25) : pxToRem(30)};

        position: relative;
        color: ${palette.common.white}; 
        font-family: "FSElliot";
        font-weight: bold;
        font-size: ${pxToRem(12)};
        padding: 0; 
      }

      .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
        opacity: 1;
      }

      .MuiSwitch-switchBase {
        padding: ${pxToRem(5)};
      }

      .MuiSwitch-track {
        opacity: 1;
        background-color: #fff;
        border: 2px solid ${palette.grey.main};
        border-radius: ${pxToRem(100)};
        &:before, &:after {
          display: inline-block;
          position: absolute;
          top: 50%;
          width: 50%;
          text-align: center;
          transform: translateY(-50%);
        }
        &:before {
          content: 'ON';
          opacity: 0;
          left: ${pxToRem(size === 'small' ? 6 : 8)};
        }
        &:after {
          content: 'OFF';
          right: ${pxToRem(5)};
          opacity: ${withInnerLabel ? 1 : 0};
          color: ${palette.grey.dark2};
        }
      }

      .MuiSwitch-thumb {
        box-shadow: none;
        background-color: ${palette.grey.main};
        width: ${size === 'small' ? pxToRem(15) : pxToRem(20)};
        height: ${size === 'small' ? pxToRem(15) : pxToRem(20)};
      }

      .Mui-checked {
        color: ${palette.common.white};

        .MuiSwitch-thumb {
          background-color: ${palette.common.white};
        }

        &.MuiSwitch-switchBase {
          transform: translateX(${size === 'small' ? SMALL_TRANSLATE_X : LARGE_TRANSLATE_X}px);
        }

        & + .MuiSwitch-track {
          border: 0;
          &:before {
            opacity: ${withInnerLabel ? 1 : 0};
          }
          &:after {
            opacity: 0;
          }
        }
      }
    `;
  }}
`;

const Switcher = ({ onClick, checked, ...props }: SwitcherProps) => {
  const [isChecked, setIsChecked] = React.useState(!!checked);

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  return <StyledSwitcher color="primary" {...props} checked={isChecked} onClick={handleOnClick} />;
};

export default Switcher;
