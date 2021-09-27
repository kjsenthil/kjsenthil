import * as React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import ShareDealingQuoteSubPage, { ShareOrderFormSubPageProps } from './ShareDealingQuoteSubPage';
import { QuoteDetails } from '../../../../services/shareDealing/machines/shareDealing/types';

jest.mock('@tswdts/react-components', () => ({
  ...jest.requireActual('@tswdts/react-components'),
  __esModule: true,
  ReceiptCard: ({ renderBottom }) => <div>{renderBottom}</div>,
}));

jest.mock('./MarketQuoteReceiptBottom', () => ({
  __esModule: true,
  default: () => <div>MarketQuoteReceiptBottom</div>,
}));

jest.mock('./LimitQuoteReceiptBottom', () => ({
  __esModule: true,
  default: () => <div>LimitQuoteReceiptBottom</div>,
}));

const quote: QuoteDetails = {
  quoteId: '236803ae-19f3-4f7c-a29c-66a6c0ad3bc2',
  quoteRequestId: '236803ae-19f3-4f7c-a29c-66a6c0ad3bc3',
  quotedPrice: 1.2,
  quoteExpiryDateTime: new Date(),
  adjustedExpiryTimeEpoch: new Date().getTime(),
  estimatedTotalOrder: 2,
  numberOfUnits: 1,
  isin: 'GB00BH4HKS39',
  orderType: 'Buy',
  cost: {
    commission: 0,
    ptmLevy: 0,
    stampDuty: 0,
  },
};

const mockOnEdit = jest.fn();
const shareName = 'Vodafone';

const props: ShareOrderFormSubPageProps = {
  executionType: 'market',
  shareName,
  quoteExpiryInMs: 20000,
  hasQuoteExpired: false,
  onEdit: mockOnEdit,
  quote,
};

describe('ShareDealingPage', () => {
  it('renders MarketQuoteReceiptBottom if execution type is market', () => {
    renderWithTheme(<ShareDealingQuoteSubPage {...props} />);

    expect(screen.getByText('Order summary')).toBeInTheDocument();
    expect(screen.getByText('MarketQuoteReceiptBottom')).toBeInTheDocument();
  });

  it('renders LimitQuoteReceiptBottom if execution type is limit', () => {
    renderWithTheme(<ShareDealingQuoteSubPage {...props} executionType="limit" />);

    expect(screen.getByText('Estimated order summary')).toBeInTheDocument();
    expect(screen.getByText('LimitQuoteReceiptBottom')).toBeInTheDocument();
  });

  it('renders a clicable edit button', () => {
    renderWithTheme(<ShareDealingQuoteSubPage {...props} />);

    const edit = screen.getByText('edit');

    fireEvent.click(edit);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });
});
