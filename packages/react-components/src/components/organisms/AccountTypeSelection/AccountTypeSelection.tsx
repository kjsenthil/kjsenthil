import * as React from 'react';
import { Box, Card, CardActionArea, Grid, Typography, Button } from '../../atoms';
import { AccountType } from '../../../constants';
import { AccountTypeCardContent, ELEVATION } from './AccountTypeSelection.styles';

interface AccountTypeCardProps {
  isSelected: boolean;
  handleCardClick: () => void;

  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
}

export interface AccountTypeSelectProps {
  onSubmit: (accountType: AccountType) => void;
}

const AccountTypeCard = ({ isSelected, handleCardClick, children }: AccountTypeCardProps) => {
  const cardElevation = isSelected ? 1 : ELEVATION;

  return (
    <Card data-testid="account-type-card" elevation={cardElevation}>
      <CardActionArea onClick={handleCardClick}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <AccountTypeCardContent>{children}</AccountTypeCardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

const AccountTypeSelection = ({ onSubmit }: AccountTypeSelectProps) => {
  const [selectedAccountType, setSelectedAccountType] = React.useState<AccountType | null>(null);

  const handleSubmit = () => {
    // Only submit if an account type is selected
    if (selectedAccountType) {
      onSubmit(selectedAccountType);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* ISA */}

      <Grid item xs={6}>
        <AccountTypeCard
          isSelected={selectedAccountType === AccountType.ISA}
          handleCardClick={() => setSelectedAccountType(AccountType.ISA)}
        >
          <Box height="100%" display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h5" align="center">
              ISA
            </Typography>
          </Box>
        </AccountTypeCard>
      </Grid>

      {/* GIA */}

      <Grid item xs={6}>
        <AccountTypeCard
          isSelected={selectedAccountType === AccountType.GIA}
          handleCardClick={() => setSelectedAccountType(AccountType.GIA)}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h5" align="center">
              GIA
            </Typography>
          </Box>
        </AccountTypeCard>
      </Grid>

      <Grid container item xs={12}>
        <Button fullWidth onClick={handleSubmit} disabled={!selectedAccountType}>
          Select
        </Button>
      </Grid>
    </Grid>
  );
};

export default AccountTypeSelection;
