import styled from 'styled-components';
import { Container, Theme } from '@tsw/react-components';

const LayoutContainer = styled(Container)`
  ${({ theme }: { theme: Theme }) => `
    background-color: ${theme.palette.background.layout};
    min-height: 100vh;
  `}
`;

export default LayoutContainer;
