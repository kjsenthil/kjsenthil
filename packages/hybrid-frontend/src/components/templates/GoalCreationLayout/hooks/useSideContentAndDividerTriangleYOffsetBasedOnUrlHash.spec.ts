import {
  calculateDividerTriangleYOffset,
  CalculateDividerTriangleYOffsetProps,
  calculateSideContentYOffset,
  CalculateSideContentYOffsetProps,
} from './useSideContentAndDividerTriangleYOffsetBasedOnUrlHash';

type DOMRectSizesOnly = Omit<DOMRect, 'toJSON'>;

function createDOMRect(params: Partial<DOMRectSizesOnly> = {}): DOMRectSizesOnly {
  const defaultDOMRect: DOMRectSizesOnly = {
    height: 0,
    width: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    y: 0,
    x: 0,
  };

  return {
    ...defaultDOMRect,
    ...params,
  };
}

describe('useSideContentAndDividerTriangleYOffsetBasedOnUrlHash', () => {
  describe('calculateSideContentYOffset', () => {
    const testCases = [
      [
        {
          overallLayoutElementRect: createDOMRect({
            height: 500,
          }),
          targetElementRect: createDOMRect({
            height: 50,
            y: 50,
          }),
          sideElementRect: createDOMRect({
            height: 100,
          }),
          extraOffset: 10,
        },

        // Expected offset of the side content is 50 (target element's y) +35
        // (1/2 target element's height) - 50 (1/2 side element's height) + 10
        // (extra offset) = 35.
        35,
      ],
      [
        {
          overallLayoutElementRect: createDOMRect({
            height: 500,
          }),
          targetElementRect: createDOMRect({
            height: 50,
            y: 50,
          }),
          sideElementRect: createDOMRect({
            height: 500,
          }),
          extraOffset: 10,
        },

        // Offset is therefore clamped to 0 if unclamped offset will push the
        // side element past the overall layout element.
        0,
      ],
      [
        {
          overallLayoutElementRect: createDOMRect({
            height: 500,
          }),
          targetElementRect: createDOMRect({
            height: 50,
            y: 400,
          }),
          sideElementRect: createDOMRect({
            height: 300,
          }),
          extraOffset: 10,
        },

        // This shows clamping where the side element is pushed to the absolute
        // maximum without going past the overall container.
        200,
      ],
    ];

    test.each(testCases)('it calculates offset correctly for case %#', (props, expected) => {
      expect(calculateSideContentYOffset(props as CalculateSideContentYOffsetProps)).toBe(expected);
    });
  });

  describe('calculateDividerTriangleYOffset', () => {
    it('calculates the offset for DividerTriangle correctly', () => {
      expect(
        calculateDividerTriangleYOffset({
          overallLayoutElementRect: createDOMRect({ height: 500 }),
          targetElementRect: createDOMRect({ y: 100, height: 100 }),
          extraOffset: 10,
        } as CalculateDividerTriangleYOffsetProps)
      ).toBe(160);
    });
  });
});
