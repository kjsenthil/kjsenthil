import { CommonState, SedolCode } from '../types';

export interface AccountData {
  id: string;
  accountName: string;
  accountValue: number;
  equityPercentage?: number;
  monthlyInvestment?: number;
}

export interface MyAccountItem {
  id: string;
  name: string;
}

export interface ClientState extends CommonState {
  client?: ClientResponse;
  getClientError?: string;
}

export interface ClientAccount {
  type: 'accounts';
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

export interface DataRelationship {
  links: {
    related?: string;
  };
  data: Record<string, unknown> | null;
}

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
  included: ClientAccount[];
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

export interface InvestmentSummaryAccountsResponse {
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

interface BreakdownItem {
  name: string;
  percentage: number;
}

export interface BreakDownAllocationResponse {
  data: {
    attributes: {
      breakdown: BreakdownItem[];
    };
    id: string;
    links: Record<string, unknown>;
    relationships: null | unknown;
    type: string;
  };
}
