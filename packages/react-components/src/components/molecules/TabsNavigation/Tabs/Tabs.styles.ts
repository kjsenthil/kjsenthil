import styled from 'styled-components';
import { Tabs as MUITabs, TabsProps as MUITabsProps, Theme } from '../../../atoms';

// We omit a few style-related props from MUI's TabsProps to make stylings
// consistent
export interface TabsProps
  extends Omit<MUITabsProps, 'indicatorColor' | 'centered' | 'orientation' | 'textColor'> {}

const Tabs = styled(MUITabs)`
  ${({ theme }: { theme: Theme }) => `
    .MuiTabs-flexContainer {
      gap: ${theme.spacing(7.5)}px;
    }
  
    & .MuiTabs-indicator {
      height: 3px;
      background-color: ${theme.palette.primary.light1};
    }
  `}
`;

export default Tabs;
