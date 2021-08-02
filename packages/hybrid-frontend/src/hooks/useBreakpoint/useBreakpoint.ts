import { useMediaQuery, useTheme } from '../../components/atoms';

const useBreakpoint = (breakpoint: 'xs' | 'sm' | 'md' | 'lg' = 'sm') => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint as any));
};

export default useBreakpoint;
