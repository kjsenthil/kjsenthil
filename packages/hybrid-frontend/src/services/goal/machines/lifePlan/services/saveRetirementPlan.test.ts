import saveRetirementPlan from './saveRetirementPlan';
import context from '../context';

const callback = jest.fn();

describe('services', () => {
  const service = saveRetirementPlan(callback);

  describe('saveRetirementPlan', () => {
    it('rejects if all or any of the required fields are empty', async () => {
      await expect(
        service({
          ...context,
          drawdownEndAge: 99,
          annualIncome: 72000,
          monthlyIncome: 6000,
        })
      ).rejects.toStrictEqual({
        drawdownStartAge: expect.toInclude('is required'),
      });
      await expect(service({ ...context })).rejects.toStrictEqual({
        drawdownStartAge: expect.toInclude('is required'),
        drawdownEndAge: expect.toInclude('is required'),
        annualIncome: expect.toInclude('is required'),
        monthlyIncome: expect.toInclude('is required'),
      });

      expect(callback).toHaveBeenCalledTimes(0);
    });

    it('resolves without errors if all required fields are present and callback suceeds', async () => {
      callback.mockResolvedValue('success');
      expect(
        await service({
          ...context,
          drawdownStartAge: 55,
          drawdownEndAge: 99,
          annualIncome: 72000,
          monthlyIncome: 6000,
        })
      ).toStrictEqual('success');
    });

    it('rejects with error from callback', async () => {
      callback.mockRejectedValue('failure');
      await expect(
        service({
          ...context,
          drawdownStartAge: 55,
          drawdownEndAge: 99,
          annualIncome: 72000,
          monthlyIncome: 6000,
        })
      ).rejects.toStrictEqual('failure');
    });
  });
});
