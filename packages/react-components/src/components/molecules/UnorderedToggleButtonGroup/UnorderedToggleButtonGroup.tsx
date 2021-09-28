import React from 'react';
import { ToggleButton, ToggleButtonGroupProps } from '../../atoms';
import { StyledToggleButtonGroup, StyledContainer } from './UnorderedToggleButtonGroup.styles';
import { useBreakpoint } from '../../../hooks';

export interface UnorderedToggleButtonGroupProps extends ToggleButtonGroupProps {
  values: string[];
  initialValue: string | React.SetStateAction<string>;
  handleChange: (event: any, newSelected: any) => void;
}

const UnorderedToggleButtonGroup = ({
  values,
  initialValue,
  handleChange,
}: UnorderedToggleButtonGroupProps) => {
  const { isMobile } = useBreakpoint();

  const control = {
    value: initialValue,
    onChange: handleChange,
    exclusive: true,
  };

  const renderToggleButtons = () =>
    values.map((value) => (
      <ToggleButton value={value} key={value}>
        {value}
      </ToggleButton>
    ));

  return (
    <StyledContainer isMobile={isMobile}>
      <StyledToggleButtonGroup isMobile={isMobile} {...control} color="primary">
        {renderToggleButtons()}
      </StyledToggleButtonGroup>
    </StyledContainer>
  );
};

export default UnorderedToggleButtonGroup;
