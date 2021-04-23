import React from 'react';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Theme } from '@material-ui/core';
import { ClickAwayListener, AnimateToggle } from '../../particles';
import { Button, ButtonProps } from '../../atoms';

export interface ButtonWithDropdownProps extends Omit<ButtonProps, 'superstar' | 'small'> {
  label: string;
  renderDropdown: React.ReactNode;
}

const ButtonWithDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  > div:first-child {
    display: flex;
    > button {
      &:first-child {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        border-right: 0;
        margin-right: -1px;
      }
      &:nth-child(3) {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        margin-left: -1px;
      }
    }
  }
`;

const ButtonLineSeparator = styled.div<ButtonWithDropdownProps>`
  width: 2px;
  height: 40px;
  z-index: 1;
  ${({ color, variant, theme }: ButtonProps & { theme: Theme }) => {
    if (typeof variant === 'undefined') {
      return `
        width: 1px;
        opacity: 1;
        background-color: ${theme.palette[color || 'primary'].main};
      `;
    }
    return `
        opacity: 0.1;
        background-color: ${theme.palette.common.white};
      `;
  }};
`;

const ButtonWithDropdown: React.FC<ButtonWithDropdownProps> = ({
  children,
  superstar,
  size,
  label,
  renderDropdown,
  ...props
}) => {
  const [dropdownToggled, setDropdownToggled] = React.useState(false);

  const onClick = () => {
    setDropdownToggled(!dropdownToggled);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setDropdownToggled(false);
      }}
    >
      <ButtonWithDropdownWrapper>
        <div>
          <Button variant="contained" {...props} onClick={onClick}>
            {label}
          </Button>
          <ButtonLineSeparator {...props} />
          <Button variant="contained" isIcon {...props} onClick={onClick}>
            <KeyboardArrowDownIcon />
          </Button>
        </div>
        <AnimateToggle top={45} shouldShow={dropdownToggled}>
          {renderDropdown}
        </AnimateToggle>
      </ButtonWithDropdownWrapper>
    </ClickAwayListener>
  );
};

export default ButtonWithDropdown;
