import styled from 'styled-components';
import { Tabs, Theme } from '../../atoms';

// eslint-disable-next-line import/prefer-default-export
export const PillsNavigationTabs = styled(Tabs)`
  ${({ theme }: { theme: Theme }) => `
    &.MuiTabs-root {
      min-height: 38px;
    }
    
    & .MuiTabs-flexContainer {
      gap: ${theme.spacing(2.5)}px;
    }
    
    & .MuiTabs-indicator {
      display: none;
    }
  `}
` as typeof Tabs;
