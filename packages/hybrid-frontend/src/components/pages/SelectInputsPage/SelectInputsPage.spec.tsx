import { render, screen } from '@testing-library/react';
import React from 'react';

const mockInputsPage = {
  fields: {
    status: '2',
    category: 5,
    description: 'Test Goals MVP 2',
    target_date: {
      _val: '2021-02-15',
      _type: 'Date',
    },
    capture_date: {
      _val: '2021-02-15',
      _type: 'Date',
    },
    advice_type: 3,
    frequency: 12,
    xpt_external_id: null,
    target_amount: {
      _val: {
        code: 'GBP',
        value: {
          _val: '40000',
          _type: 'BigDecimal',
        },
      },
      _type: 'Currency',
    },
    owner: 'client',
    goal_level_risk_tolerance: '3',
    initial_investment: {
      _val: {
        code: 'GBP',
        value: {
          _val: '2000',
          _type: 'BigDecimal',
        },
      },
      _type: 'Currency',
    },
    regular_saving: {
      _val: {
        code: 'GBP',
        value: {
          _val: '100',
          _type: 'BigDecimal',
        },
      },
      _type: 'Currency',
    },
  },
  allow_associates: false,
  allow_multiple_account_associates: false,
  index: 1790049124,
};

jest.mock('../../../api/postGoalCreation');

describe('SelectInputsPage', () => {
  test('SelectInputsPage titles has been successfully rendered', async () => {
    const mockInputs = jest.fn().mockResolvedValueOnce(mockInputsPage);

    jest.doMock('../../../api/postGoalCreation', () => ({
      postGoalCreation: mockInputs,
    }));

    // Needed to ensure the function under /endpoint.ts gets loaded first before import
    const SelectInputsPage = (await import('./SelectInputsPage')).default;
    render(<SelectInputsPage />);

    expect(screen.getByLabelText('Target Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Target Year')).toBeInTheDocument();
    expect(screen.getByLabelText('Upfront Investment')).toBeInTheDocument();
    expect(screen.getByLabelText('Monthly Investment')).toBeInTheDocument();
    expect(screen.getByLabelText('Risk Appetite')).toBeInTheDocument();
  });
});
