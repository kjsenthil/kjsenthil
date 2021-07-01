import { GoalPayloadValType, GoalPayloadValue } from '../types';

const generateCurrencyPayload = (
  value: number,
  currencyCode: string = 'GBP'
): GoalPayloadValType<GoalPayloadValue<number, 'BigDecimal'>, 'Currency', '_val'> => ({
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
