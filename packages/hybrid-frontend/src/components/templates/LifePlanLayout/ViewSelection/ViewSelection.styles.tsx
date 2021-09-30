import styled, { css } from 'styled-components';
import { Divider, Theme } from '@tswdts/react-components';

const StyledDivider = styled(Divider)`
  ${({ theme }: { theme: Theme }) => css`
    div {
      background-color: ${theme.palette.grey['200']};
      margin-top: 2px;
    }
  `}
`;

export default StyledDivider;
