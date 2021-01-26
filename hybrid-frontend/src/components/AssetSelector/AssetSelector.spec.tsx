import React from 'react';
import { render, screen } from '@testing-library/react';
import AssetSelector from './AssetSelector';

const assets = [
  {
    node: {
      id: "84a5646e-d693-58cc-b3f6-301e32837995",
      category: "Defensive",
      investmentCodeName: "TILN0715",
      sedol: "BYX8KL9",
    },
  },
  {
    node: {
      id: "37ae1ac1-bf6f-571f-a834-f4d9ee418638",
      category: "Income",
      investmentCodeName: "TILINCC",
      sedol: "BFY1N37",
    },
  },
  {
    node: {
      id: "0ea594d7-440b-5651-bc0f-0909759fd498",
      category: "Balanced",
      investmentCodeName: "TILBALC",
      sedol: "BFY1NH1",
    },
  },
];

describe('AssetSelector', () => {
  test('Lists the available assets', () => {
    render(<AssetSelector assets={assets} />);

    const numberOfAssets = assets.length;
    expect(screen.getAllByRole('listitem')).toHaveLength(numberOfAssets);
  });
});

