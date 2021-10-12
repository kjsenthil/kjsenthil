import { SedolCode, InvestmentAccount } from '@tswdts/react-components';
import { GenericApiPayload, GenericResponsePayload } from '../api/types';
import { ClientAccountTypes, CommonState } from '../types';

export interface BasicInvestmentSummary {
  totalInvested: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
  totalAnnualisedReturn?: number;
}

export interface ClientAccountItem {
  id: string;
  name: string;
  type: string;
  accountNumber?: string;
}

export interface ClientState
  extends CommonState<ClientResponse['data'], ClientResponse['included']> {}

export interface InvestmentSummaryState
  extends CommonState<InvestmentSummaryResponse['data'], InvestmentSummaryResponse['included']> {}

export interface IsaContributionState
  extends CommonState<IsaContributionResponse['data'], IsaContributionResponse['included']> {}

export interface InvestmentAccountDetailsState
  extends CommonState<
    InvestmentAccountDetailsResponse['data'],
    InvestmentAccountDetailsResponse['included']
  > {}

export interface ClientAccount {
  type: ClientAccountTypes.accounts | ClientAccountTypes.linkedAccounts;
  id: string;
  attributes: {
    accountId: number;
    accountName: string;
    accountNumber: string;
    accountStatus: string;
    accountStatusId: number;
    bestInvestAccount: string;
    capacityType: string;
    capacityTypeId: number;
    ddMandateId: number | null;
    hasIncomeAccount: boolean;
  };
  links: {
    self: string;
  };
  relationships: Record<string, DataRelationship>[] | null;
}

export interface ClientEmail {
  type: ClientAccountTypes.emails;
  id: string;
  attributes: {
    contactId: number;
    emailId: number;
    emailAddress: string;
    emailTypeId: number;
    emailType: string;
    principal: boolean;
    defaultEmail: boolean;
    updateBy: string;
  };
  links: {
    self: string;
  };
  relationships: Record<string, DataRelationship>[] | null;
}

export interface ClientAddress {
  type: ClientAccountTypes.addresses;
  id: string;
  attributes: {
    contactId: number;
    addressId: number;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    town: string;
    county: string;
    postCode: string;
    countryId: number;
    countryCode: string;
    country: string;
    addressTypeId: Number;
    addressType: string;
    principal: boolean;
  };
  links: {
    self: string;
  };
  relationships: Record<string, DataRelationship>[] | null;
}

export interface AccountState extends CommonState {
  account: InvestmentAccount;
}

export interface DataRelationship {
  links: {
    related?: string;
  };
  data: Record<string, unknown> | null;
}

export interface NetContributionSliceResponse {
  date: string;
  netContributionsToDate: number;
}

export interface NetContributionResponse {
  data: {
    type: 'net-contributions';
    id: string;
    attributes: {
      totalContributions: number;
      netContributions: NetContributionSliceResponse[];
    };
    links?: {
      self: string;
    };
    relationships?: null;
  };
  included?: null;
}

export interface InvestmentAccountsState extends CommonState<Array<InvestmentAccount>> {}

export interface ClientResponse {
  data: {
    type: string;
    id: string;
    attributes: {
      clientNumber: string;
      clientType: string;
      clientTypeId: number;
      contactId: number;
      contactStatus: string;
      currentPassword: string | null;
      dateOfBirth: string;
      firstName: string;
      lastLoginDateTime: string;
      lastName: string;
      newPassword: string | null;
      title: string;
      titleId: number;
      username: string | null;
    };
    links: {
      self: string;
    };
    relationships: {
      accounts?: DataRelationship;
      addresses?: DataRelationship;
      'contact-links'?: DataRelationship;
      'contact-settings'?: DataRelationship;
      emails?: DataRelationship;
      features?: DataRelationship;
      'investment-summary'?: DataRelationship;
      'linked-accounts'?: DataRelationship;
      phones?: DataRelationship;
      'user-basket'?: DataRelationship;
    };
  };
  included: Array<ClientAccount | ClientEmail | ClientAddress>;
}

export interface InvestmentSummary {
  type: 'investment-summary';
  id: string;
  attributes: {
    cash: number;
    cost: number;
    funds: number;
    gainLoss: number;
    gainLossPercent: number;
    lastUpdate: string | null;
    shares: number;
  };
  links: {
    self: string;
  };
  relationships: Record<string, DataRelationship>[] | null;
}

export interface InvestmentSummaryResponse {
  data: InvestmentSummary[];
  included: null;
}

interface MonthlySavingItem {
  attributes: {
    accountId: number;
    amount: number;
    assetId: number;
    assetName: string;
    isStandingOrder: boolean;
    monthlySavingId: number;
    reInvest: boolean;
    sedol: SedolCode | null;
  };
  id: string;
  links: Record<string, unknown>;
  relationships: unknown;
  type: 'monthly-savings';
}

export interface MonthlySavingsResponse {
  data: MonthlySavingItem[];
  included: null;
}

interface BreakdownAllocationItem {
  name: string;
  percentage: number;
}

export interface BreakdownAllocationResponse {
  data: {
    attributes: {
      breakdown: BreakdownAllocationItem[];
    };
    id: string;
    links: Record<string, unknown>;
    relationships: null | unknown;
    type: string;
  };
}

export interface IsaContribution {
  type: 'isa-contributions';
  id: string;
  attributes: {
    allowance: number;
    contributions: number;
  };
  links?: {
    self: string;
  };
  relationships?: null;
}

export interface IsaContributionResponse {
  data: IsaContribution;
  included?: null;
}

export type CashPositionResponse = GenericApiPayload<
  {
    cashOnAccount: number;
    cashAvailableToInvest: number;
    cashAvailableToInvestInEquity: number;
    cashAvailableToWithdraw: number;
    cashOnAccountIncome: number;
  },
  'cash-position'
>['data'];

export type AssetInfoResponse = GenericApiPayload<
  {
    assetId: number;
    assetName: string;
    isin: string;
    sedol: string;
    epic: string;
    price: number;
    priceDateTime: string;
  },
  'asset-info'
>['data'];

export type InvestmentAccountDetailsResponse = GenericResponsePayload<
  {
    accountId: number;
    accountName: string;
    accountNumber: string;
    accountStatus: 'Pre-Open' | 'Open' | 'Pre-Close' | 'Closed' | 'Setup';
    accountStatusId: number;
    bestInvestAccount: 'ISA' | 'GIA' | 'JISA' | 'SIPP';
    capacityType: string;
    capacityTypeId: number;
    dDMandateId: number;
    hasIncomeAccount: boolean;
  },
  'accounts',
  Array<CashPositionResponse | AssetInfoResponse>
>;

export interface ClientEmail {
  type: ClientAccountTypes.emails;
  id: string;
  attributes: {
    contactId: number;
    emailId: number;
    emailAddress: string;
    emailTypeId: number;
    emailType: string;
    principal: boolean;
    defaultEmail: boolean;
    updateBy: string;
  };
  links: {
    self: string;
  };
  relationships: Record<string, DataRelationship>[] | null;
}

export type BankDetailsResponse = GenericApiPayload<
  {
    bankAccountName: string;
    bankAccountNumber: string;
    bankSortCode: string;
    contactId: number;
    withdrawMoneyAllowed: boolean;
  },
  'bank-details'
>['data'];
