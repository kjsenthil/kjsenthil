import React from 'react';
import { Legend } from '..';
import { ClickAwayListener, AnimateToggle } from '../../particles';
import { TypographyProps } from '../../atoms';
import { StyledIcon, StyledWrapper, StyledButton } from './DropdownToggle.styles';

export interface DropdownToggleProps {
  value: string;
  label?: string;
  variant: TypographyProps['variant'];
  renderDropdown: React.ReactNode;
  dropdownToggled: boolean;
  setDropdownToggled: (toggled: boolean) => void;
}

const DropdownToggle = ({
  value,
  label,
  variant,
  renderDropdown,
  dropdownToggled,
  setDropdownToggled,
}: DropdownToggleProps) => {
  const handleClick = () => {
    setDropdownToggled(!dropdownToggled);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setDropdownToggled(false);
      }}
    >
      <StyledWrapper>
        <StyledButton variant={undefined} color={undefined} onClick={handleClick} disableRipple>
          <Legend title={label || ''} value={value} valueSizeVariant={variant} />
          <StyledIcon name={dropdownToggled ? 'arrowHeadUp' : 'arrowHeadDown'} />
        </StyledButton>
        <AnimateToggle top={90} shouldShow={dropdownToggled} isFullWidth>
          {renderDropdown}
        </AnimateToggle>
      </StyledWrapper>
    </ClickAwayListener>
  );
};

export default DropdownToggle;
