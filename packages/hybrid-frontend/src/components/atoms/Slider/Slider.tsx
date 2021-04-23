import React from 'react';
import { Slider as MUISlider, SliderProps as MUISliderProps } from '@material-ui/core';
import styled from 'styled-components';

export interface SliderProps extends Omit<MUISliderProps, 'color'> {
  size?: 'small' | 'large';
}

const StyledSlider = styled(MUISlider)`
  ${({
    size,
    theme: {
      palette,
      typography: { pxToRem },
    },
  }) => {
    const dimention = pxToRem(size === 'small' ? 10 : 15);
    return `
      .MuiSlider-rail, .MuiSlider-track {
        height: ${pxToRem(size === 'small' ? 2 : 5)};
        border-radius: 4px;
        background-color: ${palette.grey.light1};
      }

      .MuiSlider-track {
        background-color: ${palette.primary.main};
      }

      .MuiSlider-thumb {
        width: ${dimention};
        height: ${dimention};
        margin-top: -${pxToRem(size === 'small' ? 4 : 5)};
      }
    `;
  }}
`;

const Slider = ({ ...props }: SliderProps) => <StyledSlider size="large" {...props} />;

export default Slider;
