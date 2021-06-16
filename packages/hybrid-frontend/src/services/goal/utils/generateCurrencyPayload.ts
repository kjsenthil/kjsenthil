import { GoalRequestPayloadValType, GoalRequestPayloadValue } from '../types';

const generateCurrencyPayload = (
  value: number,
  currencyCode: string = 'GBP'
): GoalRequestPayloadValType<GoalRequestPayloadValue<number, 'BigDecimal'>, 'Currency'> => ({
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
