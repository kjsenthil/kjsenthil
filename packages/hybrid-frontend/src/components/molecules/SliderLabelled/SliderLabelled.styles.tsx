import styled from 'styled-components';
import { Slider, Theme, Icon } from '../../atoms';

export const HereContainer = styled.div`
  position: relative;
  line-height: 10px;
`;

export const HereLabel = styled.div`
  ${({ hereValue }: { hereValue: number }) => `
    position: absolute;
    top: -10px;
    left: ${hereValue}%;
    text-align: center;
    transform: translate(-45%,-50%);
    width: max-content;
  `}
`;

export const HereText = styled.div`
  ${() => `
    margin-top: -10px;
  `}
`;

export const PointerIcon = styled(Icon)`
  ${({ theme }) => `
    color: ${theme.palette.primary.light1};
  `}
`;

export const StyledSlider = styled(Slider)`
  ${({
    theme,
    showMarks,
    activeMark,
  }: {
    theme: Theme;
    showMarks: boolean;
    activeMark: number;
  }) => `
      .MuiSlider-mark {
        display: none;
      }

      .MuiSlider-markLabel {
        top: -10px;
        color: ${theme.palette.grey[400]};
        font-weight: bold;
        display: ${showMarks ? 'block' : 'none'};
      }

      .MuiSlider-markLabel[data-index="${activeMark}"] {
        color: ${theme.palette.primary.main};
      }

      & .MuiSlider-thumb {
        height: 20px;
        width: 20px;
        background-color: ${theme.palette.primary.main};
        margin-top: -8px;
        margin-left: -10px;
        border: 6px solid #FFFFFF;
        box-shadow: 0 3px 8px 0 rgba(112,120,135,0.24);
      }

      .MuiSvgIcon-fontSizeSmall {
        font-size: 1rem;
      }
    `}
`;
