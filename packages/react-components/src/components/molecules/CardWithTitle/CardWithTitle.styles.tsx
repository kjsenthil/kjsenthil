import styled, { css } from 'styled-components';
import { Theme, Card } from '../../atoms';

const StyledCardWithTitle = styled(Card)`
  ${({ theme }: { theme: Theme }) => css`
    border: 1px solid ${theme.palette.grey['200']};
    border-radius: ${theme.typography.pxToRem(16)};
    box-shadow: none;
    min-height: ${theme.typography.pxToRem(165)};
    padding: ${theme.spacing(3)}px;
    width: fit-content;
  `}
`;

export default StyledCardWithTitle;
