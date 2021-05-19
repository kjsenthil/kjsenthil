import styled from 'styled-components';
import { Container } from '../../atoms';

const CustomContainer = styled(Container)`
  ${() => `
    background-color: #f9fafc;
  `}
`;

export default CustomContainer;
