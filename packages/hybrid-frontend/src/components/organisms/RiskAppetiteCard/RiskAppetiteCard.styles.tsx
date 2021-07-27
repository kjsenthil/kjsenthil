import styled, { css } from 'styled-components';
import { Card, Theme } from '../../atoms';

const RiskAppetiteStyledCard = styled(Card)`
  ${({ theme }: { theme: Theme }) => css`
    border: 1px solid ${theme.palette.grey['200']};
    border-radius: 16px;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    height: ${theme.typography.pxToRem(165)};
    padding: ${theme.spacing(2)}px;
    width: 608px;
  `}
`;

export { RiskAppetiteStyledCard as default };
