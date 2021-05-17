/* eslint-disable import/prefer-default-export */
import { ClientResponse, MonthlySavingsResponse } from '../types';

export const mockClientResponse: ClientResponse = {
  data: {
    type: 'contact',
    id: '283732',
    attributes: {
      contactId: 283732,
      clientNumber: '12837326',
      titleId: 13,
      title: 'Miss',
      firstName: 'FirstName',
      lastName: 'LastName',
      contactStatus: 'Hybrid',
      lastLoginDateTime: '2021-05-14T15:15:00',
      username: null,
      currentPassword: null,
      newPassword: null,
      dateOfBirth: '1973-02-25T00:00:00',
      clientTypeId: 1,
      clientType: 'Individual',
    },
    links: {
      self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732',
    },
    relationships: {},
  },
  included: [
    {
      type: 'accounts',
      id: '20500',
      attributes: {
        accountId: 20500,
        accountName: 'ISA ',
        accountNumber: 'BI205006',
        accountStatus: 'Open',
        accountStatusId: 2,
        bestInvestAccount: 'ISA',
        capacityType: 'Execution Only',
        capacityTypeId: 3,
        ddMandateId: 244,
        hasIncomeAccount: false,
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/accounts/20500',
      },
      relationships: null,
    },
    {
      type: 'accounts',
      id: '20871',
      attributes: {
        accountId: 20871,
        accountName: 'SIPP ',
        accountNumber: 'BI208716',
        accountStatus: 'Open',
        accountStatusId: 2,
        bestInvestAccount: 'SIPP',
        capacityType: 'Execution Only',
        capacityTypeId: 3,
        ddMandateId: null,
        hasIncomeAccount: false,
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/accounts/20871',
      },
      relationships: null,
    },
  ],
};

export const mockMonthlySavingsResponse: MonthlySavingsResponse = {
  data: [
    {
      type: 'monthly-savings',
      id: '2121301',
      attributes: {
        monthlySavingId: 2121301,
        accountId: 20499,
        assetId: 3558,
        sedol: null,
        assetName: 'CASH',
        amount: 100,
        reInvest: true,
        isStandingOrder: false,
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/monthly-savings/2121301',
      },
      relationships: null,
    },
  ],
  included: null,
};
