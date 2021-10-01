import React from 'react';
import { ToggleButton, ToggleButtonGroupProps } from '../../atoms';
import {
  StyledUnorderedToggleButtonGroup,
  StyledUnorderedGroupContainer,
  StyledDescriptiveToggleButtonGroup,
} from './ToggleGroup.styles';
import { useBreakpoint } from '../../../hooks';
import { DescriptiveToggleButton } from '../../molecules/DescriptiveToggleButton';

export interface ToggleGroupProps extends ToggleButtonGroupProps {
  type: 'ordered' | 'unordered';
  values: string[];
  initialValue: string | React.SetStateAction<string> | null;
  handleChange: (event: any, newSelected: React.SetStateAction<string> | string) => void;
}

const ToggleGroup = ({ type, values, initialValue, handleChange }: ToggleGroupProps) => {
  const { isMobile } = useBreakpoint();

  const control = {
    value: initialValue,
    onChange: handleChange,
    exclusive: true,
  };

  const renderToggleButtons = () =>
    values.map((value, index) => {
      if (type === 'unordered') {
        return (
          <ToggleButton value={value} key={value} aria-label={`button ${index + 1}`}>
            {value}
          </ToggleButton>
        );
      }
      return (
        <DescriptiveToggleButton
          key={value}
          idNumber={index + 1}
          value={`${index + 1}`}
          content={value}
          aria-label={`button ${index + 1}`}
        />
      );
    });

  return type === 'unordered' ? (
    <StyledUnorderedGroupContainer isMobile={isMobile}>
      <StyledUnorderedToggleButtonGroup isMobile={isMobile} {...control} color="primary">
        {renderToggleButtons()}
      </StyledUnorderedToggleButtonGroup>
    </StyledUnorderedGroupContainer>
  ) : (
    <StyledDescriptiveToggleButtonGroup orientation="vertical" {...control} isMobile={isMobile}>
      {renderToggleButtons()}
    </StyledDescriptiveToggleButtonGroup>
  );
};

export default ToggleGroup;
