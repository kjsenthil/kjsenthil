import styled from 'styled-components';
import * as React from 'react';
import { useTheme } from '@material-ui/core';
import { Icon } from '../../../atoms';

const CalendarIconContainer = styled.div`
  position: relative;
  left: 30px;
  top: 27px;
`;

type PaletteType = {
  grey: {
    light2: string;
  };
};

const CalendarIcon = () => {
  const { palette } = useTheme();
  return (
    <CalendarIconContainer>
      <svg width="20" height="20" viewBox="0 0 20 20">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(-1384.000000, -133.000000) translate(0.000000, 90.000000) translate(1216.000000, 17.000000) translate(168.000000, 26.000000)">
            <circle
              cx="10"
              cy="10"
              r="10"
              fill={((palette as unknown) as PaletteType).grey.light2}
            />
            <g transform="scale(0.8, 0.8) translate(2.5 2.5)">
              <Icon name="calendar" color="primary" />
            </g>
          </g>
        </g>
      </svg>
    </CalendarIconContainer>
  );
};

export default CalendarIcon;
