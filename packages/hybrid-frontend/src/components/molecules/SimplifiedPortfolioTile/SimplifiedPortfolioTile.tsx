import React, { FunctionComponent } from 'react';
import { Link, Typography } from '../../atoms';
import {
  Accounts,
  PortfolioName,
  SimplifiedPortfolioTileContainer,
  Total,
} from './SimplifiedPortfolioTile.styles';

export interface SimplifiedPortfolioTileProps {
  portfolioName: string;
  abbreviatedAccountTypes: string[];
  total: string;
}

const SimplifiedPortfolioTile: FunctionComponent<SimplifiedPortfolioTileProps> = ({
  portfolioName,
  abbreviatedAccountTypes,
  total,
}) => (
  <SimplifiedPortfolioTileContainer>
    <PortfolioName variant="sh1">{portfolioName}</PortfolioName>
    <Accounts variant="sh4" color="secondary">
      {abbreviatedAccountTypes.join(' + ')}
    </Accounts>
    <Total variant="h2">{total}</Total>
    <Link special>
      <Typography variant="sh4" color="primary" colorShade="light1">
        Set a goal
      </Typography>
    </Link>
  </SimplifiedPortfolioTileContainer>
);

export default SimplifiedPortfolioTile;
