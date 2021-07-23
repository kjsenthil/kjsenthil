import { useMediaQuery, useTheme } from '../../../atoms';

export default function useGoalCreationLayoutIsMobile(breakpoint: 'xs' | 'sm' | 'md' = 'sm') {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint as any));
}
