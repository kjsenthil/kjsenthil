import React from 'react';
import { Grid, Typography, Spacer, Container } from '../../atoms';
import {
  HereContainer,
  HereLabel,
  HereText,
  StyledSlider,
  PointerIcon
} from './SliderLabelled.styles';

export interface SliderLabelledProps {
  max: number;
  min: number;
  step: number;
  name: string;
  value: number;
  onChange: (name: string, newValue: number) => void;
  startLabel?: string;
  endLabel?: string;
  hereValue?: number;
  showMarks?: boolean;
}

const SliderLabelled: React.FC<SliderLabelledProps> = ({
  max,
  min,
  step,
  value,
  onChange,
  startLabel,
  endLabel,
  hereValue,
  showMarks,
}) => {
  const handleChange = (sliderName: string, newValue: number) => {
    onChange(sliderName, newValue);
  };

  const marks = (min, max, step) => Array.from({ length: (max - min) / step + 1 }, (_, i) => ({ 'value': min + (i * step), 'label': min + (i * step) }));
  const hereValuePercentage = hereValue && hereValue !== 0 ? (100 * ((hereValue - min) / (max - min))) : 0;

  return (
    <Container>
      {!startLabel ? null :
        <>
          <Grid container xs={12} justifyContent="center">
            <Grid container xs={6} justify="flex-start">
              <Typography>{startLabel}</Typography>
            </Grid>
            <Grid container xs={6} justify="flex-end">
              <Typography >{endLabel}</Typography>
            </Grid>
          </Grid>
          <Spacer y={2} />
        </>
      }

      <StyledSlider
        max={max}
        min={min}
        step={step}
        name="slider-labelled"
        value={value}
        onChange={handleChange}
        aria-labelledby="slider-labelled"
        startLabel={startLabel}
        endLabel={endLabel}
        hereValue={hereValue}
        marks={marks(min, max, step)}
        showMarks={showMarks}
        activeMark={value - min}
      />

      {hereValue === null ? null :
        <HereContainer>
          <HereLabel hereValue={hereValuePercentage}>
            <PointerIcon name="arrowHeadUp" />
            <HereText>
              <Typography variant="b3" primary="grey" fontWeight="300">You are here</Typography>
            </HereText>
          </HereLabel>
        </HereContainer>
      }
    </Container >
  );
};

export default SliderLabelled;
