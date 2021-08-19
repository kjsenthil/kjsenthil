import { useMediaQuery, useTheme } from '../../components/atoms';
/**
 * Returns the following boolean values. All pixel values are Material UI defaults.
 *  * isMobile: Up to `md` breakpoint (less than 960px)
 *  * isTablet: Between `md` and `lg` breakpoints (At least 960px, and less than 1280px)
 *  * isDesktop: Greater than `lg` breakpoint (at least 1280px)
 */
const useBreakpoint = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('sm'));
  const isBelowLg = useMediaQuery(theme.breakpoints.down('md'));

  let isMobile = false;
  let isTablet = false;
  let isDesktop = false;

  if (isBelowMd) {
    isMobile = true;
  } else if (isBelowLg) {
    isTablet = true;
  } else {
    isDesktop = true;
  }

  return { isMobile, isTablet, isDesktop };
};

export default useBreakpoint;
