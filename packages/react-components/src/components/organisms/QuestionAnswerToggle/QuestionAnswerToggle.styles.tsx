import * as React from 'react';
import styled, { css } from 'styled-components';
import { Theme } from '../../atoms';

const StyledQuestionContainer = styled(({ isMobile, ...props }) => <div {...props} />)`
  ${({ theme, isMobile }: { theme: Theme; isMobile: boolean }) => css`
    max-width: 500px;
    ${isMobile
      ? `margin-bottom: ${theme.typography.pxToRem(24)}`
      : `min-height: ${theme.typography.pxToRem(124)}`}
  `}
`;

export default StyledQuestionContainer;
