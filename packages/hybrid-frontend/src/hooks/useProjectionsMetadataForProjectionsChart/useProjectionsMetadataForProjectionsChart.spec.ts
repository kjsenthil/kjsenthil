import { renderHook } from '@testing-library/react-hooks';
import MockDate from 'mockdate';
import useProjectionsMetadataForProjectionsChart from '.';
import useBasicInfo from '../useBasicInfo';

jest.mock('../useBasicInfo');

describe('useProjectionsMetadataForProjectionsChart', () => {
  beforeEach(() => {
    MockDate.set('2021-12-21');
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe('There is client data', () => {
    it('returns correct metadata when yearsUntilRetirement > 0', () => {
      (useBasicInfo as jest.Mock).mockReturnValue({
        clientAge: 50,
      });
      const { result } = renderHook(() => useProjectionsMetadataForProjectionsChart());

      expect(result.current).toEqual({
        investmentPeriod: 50,
        todayAge: 50,
      });
    });

    it('returns correct metadata when yearsUntilRetirement <= 0', () => {
      (useBasicInfo as jest.Mock).mockReturnValue({
        clientAge: 121,
      });

      const { result } = renderHook(() => useProjectionsMetadataForProjectionsChart());

      expect(result.current).toEqual({
        investmentPeriod: 50,
        todayAge: 121,
      });
    });
  });
});
