import React from 'react';
import { Settings as CarouselSettings } from 'react-slick';
import StyledSlider from './Carousel.styles';

export interface CarouselProps {
  children: React.ReactNode;
  settings?: CarouselSettings;
}

const Carousel = ({ children, settings }: CarouselProps) => {
  const defaultSettings = {
    dots: true,
  };
  const carouselSettings = { ...defaultSettings, ...settings };
  return <StyledSlider {...carouselSettings}>{children}</StyledSlider>;
};

export default Carousel;
