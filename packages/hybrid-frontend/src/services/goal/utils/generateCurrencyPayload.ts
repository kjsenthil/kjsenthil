import { GoalCurrencyValType } from '../types';

const generateCurrencyPayload = (
  value: number,
  currencyCode: string = 'GBP'
): GoalCurrencyValType => ({
  _val: {
    code: currencyCode,
    value: {
      _val: value,
      _type: 'BigDecimal',
    },
  },
  _type: 'Currency',
});

export default generateCurrencyPayload;
