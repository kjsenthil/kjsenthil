import * as React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import ShareDetails, { ShareDetailsProps } from './ShareDetails';

const props: ShareDetailsProps = {
  indicativePrice: '4.00p',
  indicativePriceTime: new Date('2021-12-11 13:10:00'),
  cashAvailable: '£12,000.00',
  riskWarningNoticeHref: '',
  keyInvestorInformationDocumentRef: '',
  onCostAndChargesClick: jest.fn(),
};

describe('ShareDetails', () => {
  beforeEach(() => {
    renderWithTheme(<ShareDetails {...props} />);
  });

  it('renders a ShareDetails', () => {
    const indicativePrice = screen.getByText('4.00p');
    const indicativePriceTime = screen.getByText('£12,000.00');

    expect(indicativePrice).toBeVisible();
    expect(indicativePriceTime).toBeVisible();
  });

  it('renders a button with onCostAndChargesClick callback', () => {
    const costAndCharges = screen.getByText('Cost and Charges disclosure');
    fireEvent.click(costAndCharges);

    expect(props.onCostAndChargesClick).toHaveBeenCalledTimes(1);
  });
});
