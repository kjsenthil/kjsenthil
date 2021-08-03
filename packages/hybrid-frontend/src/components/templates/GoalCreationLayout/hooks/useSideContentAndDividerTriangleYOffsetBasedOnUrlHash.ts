import * as React from 'react';
import { useBreakpoint } from '../../../../hooks';

export interface CalculateSideContentYOffsetProps {
  overallLayoutElementRect: DOMRect;
  targetElementRect: DOMRect;
  sideElementRect: DOMRect;
  extraOffset: number;
}

export function calculateSideContentYOffset({
  overallLayoutElementRect,
  targetElementRect,
  sideElementRect,
  extraOffset,
}: CalculateSideContentYOffsetProps): number {
  const unclampedYOffset =
    targetElementRect.y -
    overallLayoutElementRect.y +
    targetElementRect.height / 2 -
    sideElementRect.height / 2 +
    extraOffset;

  // Clamp the Y offset, preventing the side element from being pushed down
  // past the overall layout element
  return Math.max(
    Math.min(unclampedYOffset, overallLayoutElementRect.height - sideElementRect.height),
    0
  );
}

export interface CalculateDividerTriangleYOffsetProps {
  overallLayoutElementRect: DOMRect;
  targetElementRect: DOMRect;
  extraOffset: number;
}

export function calculateDividerTriangleYOffset({
  overallLayoutElementRect,
  targetElementRect,
  extraOffset,
}: CalculateDividerTriangleYOffsetProps): number {
  return (
    targetElementRect.y - overallLayoutElementRect.y + targetElementRect.height / 2 + extraOffset
  );
}

type ElementRef = React.MutableRefObject<HTMLElement | null>;

export interface UseSideContentAndDividerTriangleYOffsetBasedOnUrlHashProps {
  forceRefresh?: boolean;

  currentUrlHash: string;

  overallLayoutElementRef: ElementRef;
  mainContentElementsRefs: Array<{ hash: string; ref: ElementRef }>;
  sideContentElementRef: ElementRef;

  extraOffset?: number;
}

/**
 * The Side Content and the Divider Triangle elements move around the page on
 * desktop screens. Their positioning is determined by the current page's URL
 * hash.
 */
export default function useSideContentAndDividerTriangleYOffsetBasedOnUrlHash({
  forceRefresh,
  currentUrlHash,
  overallLayoutElementRef,
  mainContentElementsRefs,
  sideContentElementRef,
  extraOffset,
}: UseSideContentAndDividerTriangleYOffsetBasedOnUrlHashProps): {
  sideContentYOffset: number;
  dividerTriangleYOffset: number;
} {
  // Need this to re-run the layout effect when mobile / desktop view changes
  const { isMobile } = useBreakpoint();

  const [sideContentYOffset, setSideContentYOffset] = React.useState(0);
  const [dividerTriangleYOffset, setDividerTriangleYOffset] = React.useState(0);

  // Map the URL hash / ref array to an object with keys being URL hashes. This
  // allows us to determine the target element to move the Side Content and
  // Divider Triangle to.
  const mainContentElementsRefsByHash = mainContentElementsRefs.reduce<Record<string, ElementRef>>(
    (finalObject, { hash: elementHash, ref }) => {
      finalObject[elementHash] = ref;
      return finalObject;
    },
    {}
  );

  React.useLayoutEffect(() => {
    const overallLayoutElement = overallLayoutElementRef.current;

    // The Side Content is offset on the y-axis by an amount depending on the
    // current URL hash ("#") of the page.
    const targetElementRef = mainContentElementsRefsByHash[currentUrlHash];

    // If no valid hash is found, default to zero everywhere.
    if (!targetElementRef) {
      setSideContentYOffset(0);
      setDividerTriangleYOffset(0);
      return;
    }

    const targetElement = targetElementRef.current;

    // Need to know the side element's sizing to prevent it from going down
    // longer than the length of the overall layout element
    const sideElement = sideContentElementRef.current;

    if (overallLayoutElement && targetElement && sideElement) {
      const overallLayoutElementRect = overallLayoutElement.getBoundingClientRect();
      const targetElementRect = targetElement.getBoundingClientRect();
      const sideElementRect = sideElement.getBoundingClientRect();

      setSideContentYOffset(
        calculateSideContentYOffset({
          overallLayoutElementRect,
          targetElementRect,
          sideElementRect,
          extraOffset: extraOffset ?? 0,
        })
      );

      setDividerTriangleYOffset(
        calculateDividerTriangleYOffset({
          overallLayoutElementRect,
          targetElementRect,
          extraOffset: extraOffset ?? 0,
        })
      );
    }
  }, [currentUrlHash, isMobile, forceRefresh]);

  return { sideContentYOffset, dividerTriangleYOffset };
}
