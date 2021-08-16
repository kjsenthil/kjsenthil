import styled from 'styled-components';
import { Tab, TabProps, Theme } from '../../../atoms';

export type PillsNavigationTabProps = TabProps;

const PillsNavigationTab = styled(Tab)`
  ${({ theme }: { theme: Theme }) => `
    &.MuiTab-root {
      min-height: ${theme.spacing(4.75)}px;
    }
  
    &.MuiTab-textColorInherit {
      opacity: 1;
    }
  `}
` as typeof Tab;

export default PillsNavigationTab;
