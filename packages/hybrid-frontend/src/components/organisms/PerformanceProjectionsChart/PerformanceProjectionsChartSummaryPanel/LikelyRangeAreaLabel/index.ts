import styled from 'styled-components';
import { Theme } from '../../../../atoms';

const LikelyRangeAreaLabel = styled.div`
  ${({ theme }: { theme: Theme }) => `
    width: ${theme.typography.pxToRem(18)};
    height: ${theme.typography.pxToRem(20)};
    border-radius: 8px;
    background-color: ${theme.palette.tertiary.light2};
  `}
`;

export default LikelyRangeAreaLabel;
