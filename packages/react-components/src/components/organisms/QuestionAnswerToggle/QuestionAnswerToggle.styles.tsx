import * as React from 'react';
import styled, { css } from 'styled-components';

const StyledQuestionContainer = styled(({ isMobile, ...props }) => <div {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    max-width: 500px;
    ${isMobile ? ` margin-bottom: 24px;` : `height: 124px;`}
  `}
`;

export default StyledQuestionContainer;
