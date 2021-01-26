import React from 'react';

export type Asset = {
  category: string;
  id: string;
  investmentCodeName: string;
  sedol: string;
};

interface AssetSelectorProps {
  assets: {
    node: Asset;
  }[]
}

const AssetSelector: React.FC<AssetSelectorProps> = ({ assets }) => (
  <>
    <h2>List of available funds</h2>
    <ul>
      {
        assets.map(({ node: { category, id, investmentCodeName, sedol } }) =>
          <li key={id}>{sedol} - {investmentCodeName} - {category}</li>
        )
      }
    </ul>
  </>
);

export default AssetSelector;
