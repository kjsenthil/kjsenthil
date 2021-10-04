import styled from 'styled-components';
import { Theme } from '../../atoms';

export type SliderWithInputLayout = 'slider-next-to-input' | 'slider-below-input';

const sliderNextToInputContainerLayout = (theme: Theme) => `
  display: grid;
  grid: auto / 1fr 1fr;
  gap: ${theme.spacing(3)}px;
  align-items: center;
`;

const sliderBelowInputContainerLayout = (theme: Theme) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)}px;
  align-items: center;
`;

export const SliderWithInputContainer = styled.div`
  ${({ theme, layout }: { theme: Theme; layout: SliderWithInputLayout }) => `
    ${
      layout === 'slider-next-to-input'
        ? sliderNextToInputContainerLayout(theme)
        : sliderBelowInputContainerLayout(theme)
    }
  `}
`;

export const SliderWithInputTypographyContainer = styled.div`
  ${({ layout }: { layout: SliderWithInputLayout }) => `
    ${layout === 'slider-next-to-input' ? 'grid-area: 1 / 1 / 2 / 3' : 'width: 100%;'};
  `}
`;

export const SliderWithInputSliderContainer = styled.div`
  ${({ layout }: { layout: SliderWithInputLayout }) => `
    ${layout === 'slider-next-to-input' ? 'grid-area: 2 / 1 / 3 / 2' : 'width: 100%;'};
  `}
`;

export const SliderWithInputInputContainer = styled.div`
  ${({ layout }: { layout: SliderWithInputLayout }) => `
    ${layout === 'slider-next-to-input' ? 'grid-area: 2 / 2 / 3 / 3' : 'width: 100%;'};
  `}
`;
