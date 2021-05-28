import { useStaticQuery } from 'gatsby';
import { mockAssets } from '../mocks';
import useAllAssets from './useAllAssets';

const mockUseStaticQuery = useStaticQuery as jest.Mock;

describe('useAllAssets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('useAllAssets returns asset values as intended', () => {
    mockUseStaticQuery.mockReturnValue(mockAssets);

    const funds = useAllAssets();
    expect(funds).toStrictEqual(mockAssets);
  });
});
