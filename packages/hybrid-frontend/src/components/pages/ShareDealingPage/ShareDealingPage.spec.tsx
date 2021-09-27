import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import { useShareDealingMachine } from '../../../hooks';
import { shareDealingContext } from '../../../services/shareDealing/machines/shareDealing';
import ShareDealingPage from './ShareDealingPage';

jest.mock('@tswdts/react-components', () => ({
  ...jest.requireActual('@tswdts/react-components'),
  __esModule: true,
  ConfirmationModal: () => <div>Are you sure you want to cancel?</div>,
  LinearProgress: () => <div>Loading...</div>,
}));

jest.mock('../../../hooks', () => ({
  useShareDealingMachine: jest.fn(),
}));

jest.mock('./ShareOrderFormSubPage', () => ({
  __esModule: true,
  default: () => <div>ShareOrderFormSubPage</div>,
}));

jest.mock('./ShareDealingQuoteSubPage', () => ({
  __esModule: true,
  default: () => <div>ShareDealingQuoteSubPage</div>,
}));

jest.mock('./ShareDealingConfirmedOrderSubPage', () => ({
  __esModule: true,
  default: () => <div>ShareDealingConfirmedOrderSubPage</div>,
}));

const shareName = 'Vodafone Group';
const accountId = 21978;
const isin = 'GB00BH4HKS39';
const accountName = 'ISA';

const mockMatches = jest.fn();
const mockOnTransition = jest.fn();
const mockUseShareDealingMachine = useShareDealingMachine as jest.Mock;

describe('ShareDealingPage', () => {
  let state;
  let service;
  let send;

  beforeEach(() => {
    state = {
      matches: mockMatches,
      context: { ...shareDealingContext, shareName, accountName },
      toStrings: jest.fn(),
    };
    service = { onTransition: mockOnTransition };
    send = jest.fn();

    mockUseShareDealingMachine.mockReturnValue({
      state,
      send,
      service,
      isLoading: false,
    });
  });

  it('renders share name title and subtitle', () => {
    mockUseShareDealingMachine.mockReturnValue({
      state,
      send,
      service,
      isLoading: false,
    });
    renderWithTheme(<ShareDealingPage orderType="buy" isin={isin} accountId={accountId} />);

    expect(screen.getByText(shareName)).toBeInTheDocument();
    expect(screen.getByText('STOCKS & SHARES ISA')).toBeInTheDocument();
  });

  it('renders LinearProgress when state is loading', () => {
    mockUseShareDealingMachine.mockReturnValue({
      state,
      send,
      service,
      isLoading: true,
    });
    renderWithTheme(<ShareDealingPage orderType="buy" isin={isin} accountId={accountId} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders ShareOrderFormSubPage when state value ordering.creatingOrder.marketOrder', () => {
    mockMatches.mockImplementation((match) => match === 'ordering.creatingOrder.limitOrder');

    renderWithTheme(<ShareDealingPage orderType="buy" isin={isin} accountId={accountId} />);

    expect(screen.getByText('ShareOrderFormSubPage')).toBeInTheDocument();
  });

  it('renders confirmation modal when state value cancelling', () => {
    mockMatches.mockImplementation((match) => match === 'cancelling');

    renderWithTheme(<ShareDealingPage orderType="buy" isin={isin} accountId={accountId} />);

    expect(screen.getByText('Are you sure you want to cancel?')).toBeInTheDocument();
  });

  it('renders ShareDealingQuoteSubPage when state value ordering.previewingQuote', () => {
    mockMatches.mockImplementation((match) => match === 'ordering.previewingQuote');

    renderWithTheme(<ShareDealingPage orderType="buy" isin={isin} accountId={accountId} />);

    expect(screen.getByText('ShareDealingQuoteSubPage')).toBeInTheDocument();
  });

  it('renders ShareDealingConfirmedOrderSubPage when state value success', () => {
    mockMatches.mockImplementation((match) => match === 'success');

    renderWithTheme(<ShareDealingPage orderType="buy" isin={isin} accountId={accountId} />);

    expect(screen.getByText('ShareDealingConfirmedOrderSubPage')).toBeInTheDocument();
  });
});
