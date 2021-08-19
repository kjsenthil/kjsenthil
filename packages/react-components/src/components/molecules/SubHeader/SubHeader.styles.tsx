import styled from 'styled-components';
import { Theme, Toolbar } from '../../atoms';

const StyledToolBar = styled(Toolbar)`
  ${({ theme }: { theme: Theme }) => `
    .MuiToolbar-root {
      border-top: 2px solid ${theme.palette.grey};
    }
  `}
`;

export default StyledToolBar;
