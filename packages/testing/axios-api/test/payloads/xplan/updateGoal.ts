export default {
  fields: {
    description: 'savings goal',
    target_amount: {
      _val: {
        code: 'GBP',
        value: {
          _val: '100000',
          _type: 'BigDecimal',
        },
      },
      _type: 'Currency',
    },
    initial_investment: {
      _val: {
        code: 'GBP',
        value: {
          _val: '20000',
          _type: 'BigDecimal',
        },
      },
      _type: 'Currency',
    },
    term_timeframe: 'medium_term',
    regular_saving: {
      _val: {
        code: 'GBP',
        value: {
          _val: '5000',
          _type: 'BigDecimal',
        },
      },
      _type: 'Currency',
    },
    frequency: '12',
  },
};
