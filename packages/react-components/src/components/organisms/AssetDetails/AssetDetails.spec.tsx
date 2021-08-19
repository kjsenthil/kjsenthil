import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';

import AssetDetails from './AssetDetails';
import { AssetData } from '../../../services/assets';

const mockAsset: AssetData = {
  assetName: 'TILNEY GROWTH PORTFOLIO CLEAN',
  investmentCodeName: 'TILN3743',
  logoUrl: '',
  groupCode: 'TILN,FUNT',
  sedolAcc: 'BYX8KR5',
  sedolInc: 'BYX8KS6',
  sedol: 'BYX8KR5',
  assetGroup: 'Fund',
  reinvestIncome: null,
  standardInitialCharge: 0.0,
  unitType: 'Acc',
  isaEligible: true,
  sippEligible: true,
  isValid: false,
  slug: 'tilney-growth-portfolio-clean',
  sector: 'UNDEFINED',
  sectorCode: null,
  groupName: 'Fund',
};

describe('AssetDetails', () => {
  test('Renders the asset details', async () => {
    renderWithTheme(<AssetDetails data={mockAsset} />);
    expect(await screen.findByText(mockAsset.assetName)).toBeInTheDocument();
    expect(await screen.findByText('ISA Eligible')).toBeInTheDocument();
    expect(await screen.findByText('SIPP Eligible')).toBeInTheDocument();
  });
});
