import { RiskModel } from '@tsw/react-components';
import upsertGoal from './upsertGoal';
import context from '../context';

const callback = jest.fn();

describe('services', () => {
  const service = upsertGoal(callback);
  const prerequisites = {
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
  const event = { type: 'Some', payload: prerequisites };

  describe('upsertGoal', () => {
    it('rejects if all or any of the required fields are empty', async () => {
      await expect(
        service(
          {
            ...context,
            drawdownEndAge: 99,
            annualIncome: 72000,
            monthlyIncome: 6000,
            lumpSum: 10000,
            lumpSumAge: 65,
            laterLifeLeftOver: 10000,
          },
          event
        )
      ).rejects.toStrictEqual({
        drawdownStartAge: expect.toInclude('is required'),
      });
      await expect(service({ ...context }, event)).rejects.toStrictEqual({
        drawdownStartAge: expect.toInclude('is required'),
        drawdownEndAge: expect.toInclude('is required'),
        annualIncome: expect.toInclude('is required'),
        monthlyIncome: expect.toInclude('is required'),
        lumpSum: expect.toInclude('is required'),
        lumpSumAge: expect.toInclude('is required'),
        laterLifeLeftOver: expect.toInclude('is required'),
      });

      expect(callback).toHaveBeenCalledTimes(0);
    });

    it('resolves without errors if all required fields are present and callback suceeds', async () => {
      callback.mockResolvedValue('success');
      expect(
        await service(
          {
            ...context,
            drawdownStartAge: 55,
            drawdownEndAge: 99,
            annualIncome: 72000,
            monthlyIncome: 6000,
            lumpSum: 10000,
            lumpSumAge: 65,
            laterLifeLeftOver: 10000,
          },
          event
        )
      ).toStrictEqual('success');
    });

    it('rejects with error from callback', async () => {
      callback.mockRejectedValue('failure');
      await expect(
        service(
          {
            ...context,
            drawdownStartAge: 55,
            drawdownEndAge: 99,
            annualIncome: 72000,
            monthlyIncome: 6000,
            lumpSum: 10000,
            lumpSumAge: 65,
            laterLifeLeftOver: 10000,
          },
          event
        )
      ).rejects.toStrictEqual('failure');
    });
  });
});
