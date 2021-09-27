import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ShareOrderFormSubPage from './ShareOrderFormSubPage';
import { SendEvent } from '../../../../hooks/useShareDealingMachine/useShareDealingMachine';
import { shareDealingContext } from '../../../../services/shareDealing/machines/shareDealing';

jest.mock('@tswdts/react-components', () => ({
  ...jest.requireActual('@tswdts/react-components'),
  __esModule: true,
  ShareDetails: () => <div>ShareDetails</div>,
  ShareOrderForm: () => <div>ShareOrderForm</div>,
}));

describe('ShareDealingPage', () => {
  const send: SendEvent = jest.fn();

  it('renders ShareDetails and ShareOrderForm', () => {
    renderWithTheme(<ShareOrderFormSubPage send={send} context={shareDealingContext} />);

    expect(screen.getByText('ShareDetails')).toBeInTheDocument();
    expect(screen.getByText('ShareOrderForm')).toBeInTheDocument();
  });

  it('does not render a banner that market is closed', () => {
    renderWithTheme(
      <ShareOrderFormSubPage send={send} context={{ ...shareDealingContext, isMarketOpen: true }} />
    );

    expect(screen.queryByText('The market is currently closed')).not.toBeInTheDocument();
  });

  it('renders a banner that market is closed', () => {
    renderWithTheme(
      <ShareOrderFormSubPage
        send={send}
        context={{ ...shareDealingContext, isMarketOpen: false }}
      />
    );

    expect(screen.getByText('The market is currently closed')).toBeInTheDocument();
  });
});
