import styled, { css } from 'styled-components';
import { AppBar } from '../../atoms';

const StyledStickyAppBar = styled(AppBar)`
  ${({ stickyEnabled }: { stickyEnabled: boolean }) => css`
    box-shadow: 1px 2px 44px 0 rgba(139, 139, 139, 0.26);
    visibility: ${stickyEnabled ? 'visible' : 'hidden'};
    height: ${stickyEnabled ? 'auto' : '1px'}; // Needed to avoid losing elementRef
  `}
`;

export default StyledStickyAppBar;
