import styled from 'styled-components';
import { Container, Theme } from '../../atoms';

const LayoutContainer = styled(Container)`
  ${({ theme }: { theme: Theme }) => `
    background-color: ${theme.palette.background.layout};
    height: 100vh;
  `}
`;

export default LayoutContainer;
