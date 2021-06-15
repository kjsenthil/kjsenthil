import guards from './guards';
import context from './context';

describe('guards', () => {
  describe('isClientAgeUpToDrawdownStartAge', () => {
    it('returns true if client age is less than or equal to start age', () => {
      expect(
        guards.isClientAgeUpToDrawdownStartAge({ ...context, drawdownStartAge: 50, clientAge: 50 })
      ).toBeTrue();
      expect(
        guards.isClientAgeUpToDrawdownStartAge({ ...context, drawdownStartAge: 51, clientAge: 50 })
      ).toBeTrue();
    });

    it('returns false if client age is greater than start age', () => {
      expect(
        guards.isClientAgeUpToDrawdownStartAge({ ...context, drawdownStartAge: 49, clientAge: 50 })
      ).toBeFalse();
    });
  });

  describe('isDrawdownEndAgeUpTo100', () => {
    it('returns true if drawdown end age is less than or equal to 100', () => {
      expect(guards.isDrawdownEndAgeUpTo100({ ...context, drawdownEndAge: 100 })).toBeTrue();
      expect(guards.isClientAgeUpToDrawdownStartAge({ ...context, drawdownEndAge: 99 })).toBeTrue();
    });

    it('returns false if drawdown end age is greater than to 100', () => {
      expect(guards.isDrawdownEndAgeUpTo100({ ...context, drawdownEndAge: 101 })).toBeFalse();
    });
  });

  describe('isDrawdownEndAgeGreaterThanStartAge', () => {
    it('returns true if drawdown end age is greater than drawdown start age', () => {
      expect(
        guards.isDrawdownEndAgeGreaterThanStartAge({
          ...context,
          drawdownEndAge: 60,
          drawdownStartAge: 59,
        })
      ).toBeTrue();
    });

    it('returns false if drawdown end age is equal or less than drawdown start age', () => {
      expect(
        guards.isDrawdownEndAgeGreaterThanStartAge({
          ...context,
          drawdownEndAge: 60,
          drawdownStartAge: 60,
        })
      ).toBeFalse();
      expect(
        guards.isDrawdownEndAgeGreaterThanStartAge({
          ...context,
          drawdownEndAge: 59,
          drawdownStartAge: 60,
        })
      ).toBeFalse();
    });
  });
});
