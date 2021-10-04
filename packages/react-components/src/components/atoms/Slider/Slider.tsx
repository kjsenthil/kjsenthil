import * as React from 'react';
import {
  Slider as MUISlider,
  SliderProps as MUISliderProps,
  SliderTypeMap as MUISliderTypeMap,
  Theme,
} from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import styled from 'styled-components';

// There is an issue with the how MUI Slider's onChange handler's event object
// is typed. Looks like this issue is fixed in MUI v5+ but for now, we do some
// funky typings. See more below:
// https://github.com/mui-org/material-ui/issues/20191#issuecomment-924733880

export interface SliderProps extends Omit<MUISliderProps, 'color' | 'onChange'> {
  size?: 'small' | 'large';
}

type SliderComponent = OverridableComponent<MUISliderTypeMap<SliderProps, 'span'>>;

const StyledSlider = styled(MUISlider)`
  ${({
    size,
    theme: {
      palette,
      typography: { pxToRem },
    },
  }: SliderProps & { theme: Theme }) => {
    const dimention = pxToRem(size === 'small' ? 10 : 15);
    return `
      .MuiSlider-rail, .MuiSlider-track {
        height: ${pxToRem(size === 'small' ? 2 : 5)};
        border-radius: 4px;
        background-color: ${palette.grey['200']};
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

const Slider: SliderComponent = ({ ...props }: SliderProps) => (
  <StyledSlider size="large" {...props} />
);

export default Slider;
