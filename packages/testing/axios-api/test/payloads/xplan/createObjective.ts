export default {
  fields: {
    description: 'Goal Objective 2',
    owner: 'client',
    target_amount: {
      _val: {
        code: 'GBP',
        value: {
          _val: '10000',
          _type: 'BigDecimal',
        },
      },
      _type: 'Currency',
    },
    capture_date: {
      _val: '2021-02-19',
      _type: 'Date',
    },
  },
};
