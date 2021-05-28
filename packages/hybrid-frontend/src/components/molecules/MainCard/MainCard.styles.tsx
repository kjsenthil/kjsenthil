import styled from 'styled-components';
import { Card } from '../../atoms';

export const CustomCard = styled(Card)`
  ${({ theme }) => `
    padding: ${theme.spacing(5)}px;
    background-color:  ${theme.palette.background.paper};
    box-shadow: 1px 2px 44px 0 rgba(139,139,139,0.26);
    border-radius: 16px;
  `}
`;

export const ActionElementContainer = styled.div`
  max-width: 33%;
`;
