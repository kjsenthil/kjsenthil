import updateCurrentProjections from './updateCurrentProjections';
import context from '../context';
import guards from '../guards';
import { RiskModel } from '../../../../types';
import { CurrentProjectionsPrerequisitePayload } from '../../../../projections';

jest.mock('../guards');

const callback = jest.fn();

describe('services', () => {
  const service = updateCurrentProjections(callback);

  const mockIsDrawdownEndAgeGreaterThanStartAge = guards.isDrawdownEndAgeGreaterThanStartAge as jest.Mock;
  const mockIsClientAgeUpToDrawdownStartAge = guards.isClientAgeUpToDrawdownStartAge as jest.Mock;
  const mockIsDrawdownEndAgeUpTo100 = guards.isDrawdownEndAgeUpTo100 as jest.Mock;

  const projectionsPrerequisitesPayloadPayload: Omit<
    CurrentProjectionsPrerequisitePayload,
    'riskProfile'
  > = {
    portfolioCurrentValue: 0,
    monthlyContributions: 0,
    totalNetContributions: 0,
    assetModel: {
      id: 111,
      riskModel: RiskModel.TAA1,
      erValue: 0,
      volatility: 0,
      zScores: {
        moreLikelyLb: 0,
        moreLikelyUb: 0,
        lessLikleyLb: 0,
        lessLikelyUb: 0,
      },
    },
  };

  const event = {
    type: 'updateCurrentProjections',
    payload: projectionsPrerequisitesPayloadPayload,
  };
  describe('updateCurrentProjections', () => {
    it('rejects if any or all the guards return false', async () => {
      mockIsDrawdownEndAgeUpTo100.mockReturnValue(false);
      mockIsClientAgeUpToDrawdownStartAge.mockReturnValue(false);
      mockIsDrawdownEndAgeGreaterThanStartAge.mockReturnValue(false);

      await expect(service(context, event)).rejects.toStrictEqual({
        drawdownEndAge: 'Please pick an age less than 100',
        drawdownStartAge: 'Please pick an age greater than your current age',
      });

      expect(callback).toHaveBeenCalledTimes(0);
    });

    describe('when no errors', () => {
      beforeEach(() => {
        mockIsDrawdownEndAgeUpTo100.mockReturnValue(true);
        mockIsClientAgeUpToDrawdownStartAge.mockReturnValue(true);
        mockIsDrawdownEndAgeGreaterThanStartAge.mockReturnValue(true);
      });
      it('resolves without errors if all required fields are present and callback suceeds', async () => {
        callback.mockResolvedValue('success');
        expect(await service(context, event)).toStrictEqual('success');
      });

      it('rejects with error from callback', async () => {
        callback.mockRejectedValue('failure');
        await expect(service(context, event)).rejects.toStrictEqual('failure');
      });
    });
  });
});
