import styled from 'styled-components';
import { Card } from '../../atoms';

const CustomCard = styled(Card)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px;
    background-color:  ${theme.palette.background.paper};
    box-shadow: 1px 2px 44px 0 rgba(139,139,139,0.26);
    border-radius: 16px;
  `}
`;

export default CustomCard;
