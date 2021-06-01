// TODO: determine the screen size based on screen width

import { ScreenSize } from '../../config/chart';

/**
 * This hook returns the current screen size based on screen width
 */
export default function useScreenSize(): ScreenSize {
  return ScreenSize.DESKTOP;
}
