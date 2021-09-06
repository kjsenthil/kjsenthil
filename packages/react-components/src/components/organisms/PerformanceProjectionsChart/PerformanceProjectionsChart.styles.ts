import styled from 'styled-components';

// The GoalIndicators are absolute-positioned elements outside of the chart svg.
// This we need this relative container to maintain the goal indicators'
// positioning.
// eslint-disable-next-line import/prefer-default-export
export const SvgAndGoalIndicatorsContainer = styled.div`
  position: relative;
`;
