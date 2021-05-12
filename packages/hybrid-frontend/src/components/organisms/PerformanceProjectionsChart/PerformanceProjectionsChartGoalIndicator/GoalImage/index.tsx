import styled from 'styled-components';
import * as React from 'react';
import { Theme } from '../../../../atoms';

interface GoalImageProps {
  imageSrc: string;
  goalMet: boolean;
}

const GoalImageContainer = styled.div`
  position: relative;
`;

const GoalImageImage = ({ imageSrc, goalMet, ...props }: GoalImageProps) => (
  <svg viewBox="0 0 45 50" width={44} height={50} {...props}>
    <pattern id={`goal-indicator-icon-fill-${imageSrc}`} x="0" y="0" width="1" height="1">
      <image href={imageSrc} x="0" y="0" width="50" height="50" />
    </pattern>

    <path
      fill={`url(#${`goal-indicator-icon-fill-${imageSrc}`})`}
      strokeWidth={1}
      d="M28.6935484,0.5 C32.9737552,0.5 36.8487552,2.23489659 39.6537035,5.03984489 C42.4586518,7.84479319 44.1935484,11.7197932 44.1935484,16 L44.1935484,16 L44.1935484,28 C44.1935484,32.1487039 42.5636342,35.9167302 39.9091841,38.6986156 C37.2008552,41.5369664 33.4260432,43.3489173 29.2276593,43.490975 L29.2276593,43.490975 L23.5872251,49.129827 C23.3404431,49.376609 23.0169957,49.5 22.6935484,49.5 C22.370101,49.5 22.0466537,49.376609 21.7998221,49.1297774 L21.7998221,49.1297774 L16.1594375,43.490975 C11.9610535,43.3489173 8.18624156,41.5369664 5.47791272,38.6986156 C2.82346259,35.9167302 1.19354839,32.1487039 1.19354839,28 L1.19354839,28 L1.19354839,16 C1.19354839,11.7197932 2.92844498,7.84479319 5.73339328,5.03984489 C8.53834158,2.23489659 12.4133416,0.5 16.6935484,0.5 L16.6935484,0.5 Z"
    />
  </svg>
);

const SGoalImageImage = styled(GoalImageImage)`
  ${({ theme, goalMet }: { theme: Theme } & GoalImageProps) => `
    & path {
      stroke: ${goalMet ? theme.palette.tertiary.main : theme.palette.gold.main}
    }
  `}
`;

export default function GoalImage({ goalMet, imageSrc }: GoalImageProps) {
  return (
    <GoalImageContainer>
      <SGoalImageImage goalMet={goalMet} imageSrc={imageSrc} />
    </GoalImageContainer>
  );
}
