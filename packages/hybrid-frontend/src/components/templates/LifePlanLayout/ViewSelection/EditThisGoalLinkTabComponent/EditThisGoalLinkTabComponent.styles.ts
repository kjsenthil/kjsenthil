import styled from 'styled-components';
import { Link, Theme } from '@tswdts/react-components';

// The styles below override a lot of the default MUI Tab element's styles to
// achieve the desired "float-right" effect.
// eslint-disable-next-line import/prefer-default-export
export const EditThisGoalLink = styled(Link)`
  ${({ theme }: { theme: Theme }) => `
    flex-grow: 1;
    min-width: initial;
    max-width: initial;
    padding: 0;
    
    & .MuiTab-wrapper {
      align-items: flex-end;
    }
    
    &.MuiTab-textColorInherit {
      opacity: 1;
    }
    
    font-size: ${theme.typography.pxToRem(12)};
    color: ${theme.palette.primary.light1};
    text-decoration: underline;
    text-transform: none;
    text-align: right;
  `}
`;
