import styled from 'styled-components';
import { Card, Theme } from '../../atoms';

// eslint-disable-next-line import/prefer-default-export
export const CardContainer = styled(Card)`
  ${({ theme }: { theme: Theme }) => `
    padding: ${theme.spacing(4)}px;
    background-color:  ${theme.palette.background.paper};
    box-shadow: 1px 2px 44px 0 rgba(139,139,139,0.26);
    border-radius: 16px;
  `}
`;
