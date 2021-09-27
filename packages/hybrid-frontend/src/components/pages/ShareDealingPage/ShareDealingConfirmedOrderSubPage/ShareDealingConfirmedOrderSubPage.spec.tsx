import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ShareOrderFShareDealingConfirmedOrderSubPageormSubPage from './ShareDealingConfirmedOrderSubPage';
import { OrderDetails } from '../../../../services/shareDealing/machines/shareDealing/types';

jest.mock('@tswdts/react-components', () => ({
  ...jest.requireActual('@tswdts/react-components'),
  __esModule: true,
  ReceiptCard: ({ cardHeader }) => <div>{cardHeader}</div>,
}));

const order: OrderDetails = {
  orderId: '123456',
  orderPlacedDate: new Date(),
  orderStatus: 'New',
  epicCode: 'VOD',
  quotedPrice: 1.2,
  shareName: 'VODAFONE',
  transactionTime: new Date(),
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

describe('ShareDealingPage', () => {
  it('renders share name and receipt', () => {
    renderWithTheme(
      <ShareOrderFShareDealingConfirmedOrderSubPageormSubPage
        executionType="market"
        accountName="Share & Stocks ISA"
        order={order}
      />
    );

    expect(screen.getByText(order.shareName)).toBeInTheDocument();
    expect(screen.getByText('SHARE & STOCKS ISA')).toBeInTheDocument();
  });
});
