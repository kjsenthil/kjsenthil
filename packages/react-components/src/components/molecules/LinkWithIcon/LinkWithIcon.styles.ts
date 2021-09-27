import styled, { css } from 'styled-components';
import { Link, Theme } from '../../atoms';

export const FlexLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.span`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => css`
    font-size: ${pxToRem(15)};
    line-height: 0;
  `}
`;
