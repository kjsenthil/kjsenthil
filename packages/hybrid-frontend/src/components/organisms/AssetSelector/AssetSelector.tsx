import React from 'react';
import styled from 'styled-components';
import { MenuItem, FormControl, Select, InputLabel } from '../../atoms';

export type Asset = {
  category: string;
  id: string;
  investmentCodeName: string;
  sedol: string;
};

interface AssetSelectorProps {
  assets: {
    node: Asset;
  }[];
  onChange: (newValue: string) => void;
  value: Asset['sedol'];
}

const StyledFormControl = styled(FormControl)`
  margin: 1rem 0 2rem;
  min-width: 100%;
`;

const AssetSelector: React.FC<AssetSelectorProps> = ({ assets, onChange, value }) => {
  const defaultValue = value || (assets.length && assets[0].node.sedol);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const newValue = event.target.value as string;
    onChange(newValue);
  };

  return (
    <StyledFormControl>
      <InputLabel id="asset-selector-label">Select a fund</InputLabel>
      <Select
        data-testid="asset-selector-list"
        defaultValue={defaultValue}
        labelId="asset-selector-label"
        onChange={handleChange}
        value={value}
      >
        {assets.map(({ node: { category, id, sedol } }) => (
          <MenuItem key={id} value={sedol}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default AssetSelector;
