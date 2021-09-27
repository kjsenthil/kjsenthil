import styled, { css } from 'styled-components';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledSlider = styled(Slider)`
  ${({ theme }) => css`
    .slick-dots li button:before {
      color: ${theme.palette.grey.main};
    }
    .slick-dots li.slick-active button:before {
      color: ${theme.palette.primary.main};
    }
  `}
`;

export default StyledSlider;
