import styled from 'styled-components';
import { Tab as MUITab, TabProps as MUITabProps, Theme } from '../../../atoms';
import { TabComponentProps } from './TabComponent';

export interface TabProps extends Omit<MUITabProps, 'component' | 'wrapped'>, TabComponentProps {}

export const STab = styled(MUITab)`
  ${({ theme }: { theme: Theme }) => `
    &.MuiTab-root {
      min-width: 0;
      max-width: none;
      padding: 0 0 ${theme.spacing(2.5)}px 0;
      text-transform: none;
    }
    
    &.MuiTab-textColorInherit {
      color: ${theme.palette.grey['300']};
      opacity: 0.4;
    }
    
    &.MuiTab-textColorInherit.Mui-selected {
      color: ${theme.palette.primary.dark2};
      opacity: 1;
    }
  `}
`;
