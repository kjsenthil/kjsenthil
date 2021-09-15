import getGoalSelectionTiles, { GetGoalSelectionTilesProps } from './getGoalSelectionTiles';
import testCases from './getGoalSelectionTilesTestData';

describe('getGoalSelectionTiles', () => {
  // TypeScript is complaining about the line below. We can solve this by setting the type of
  // 'testCases' to a Tuple. However our ESLint package doesn't support this yet and thus it will
  // throw an error when linting. Until our ESLint package is upgraded to v4+, we'll need this TS
  // ignore line.
  // @ts-ignore
  test.each(testCases)('it %s', (_, getGoalSelectionTilesProps, expectedResult) => {
    expect(getGoalSelectionTiles(getGoalSelectionTilesProps as GetGoalSelectionTilesProps)).toEqual(
      expectedResult
    );
  });
});
