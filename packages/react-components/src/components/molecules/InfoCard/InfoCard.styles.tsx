import styled, { css } from 'styled-components';
import { Card, Theme } from '../../atoms';

const InfoCardContainer = styled(Card)`
  ${({ theme }: { theme: Theme }) => css`
    background-color: ${theme.palette.background.paper};
    border-radius: ${theme.spacing(2)}px;
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.07);
    color: ${theme.palette.grey['400']};
    padding: ${theme.spacing(5)}px;
  `}
`;

export default InfoCardContainer;
