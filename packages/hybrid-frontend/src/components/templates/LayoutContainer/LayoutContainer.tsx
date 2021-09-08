import styled from 'styled-components';
import { Container, Theme } from '@tswdts/react-components';

const LayoutContainer = styled(Container)`
  ${({ theme }: { theme: Theme }) => `
    background-color: ${theme.palette?.background?.layout};
    min-height: 100vh;
    max-width: 1440px;
  `}
`;

export default LayoutContainer;
