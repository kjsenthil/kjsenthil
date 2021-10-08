import React, { useState } from 'react';
import { Box, DialogProps, Grid, Icon, Spacer, Typography } from '../../atoms';
import { FormInput, CheckboxAccountSelector } from '../../molecules';
import {
  StyledBox,
  StyledButton,
  StyledDialogContainer,
  StyledDialogContent,
  StyledIcon,
  StyledIconButton,
} from './PortfolioModal.styles';
import { useBreakpoint } from '../../../hooks';
import { Require } from '../../../utils/common';

export interface AccountData {
  id: string;
  account: string;
  balance: string;
  linked?: boolean;
}

export interface PortfolioAccountData {
  name: string;
  accounts: AccountData[];
}

export interface PortfolioModalProps extends Require<DialogProps, 'onClose'> {
  onSubmit: (event: {}) => void;
  type: 'create' | 'edit';
  allAccounts: AccountData[];
  portfolioAccounts?: PortfolioAccountData;
  name?: string;
}

const PortfolioModal = ({
  onSubmit,
  onClose,
  type,
  allAccounts,
  portfolioAccounts,
  name,
  ...props
}: PortfolioModalProps) => {
  const { isMobile } = useBreakpoint();

  const initialAccountIds =
    type === 'edit' && portfolioAccounts
      ? portfolioAccounts.accounts.map((account) => account.id)
      : [];

  const [portfolioName, setPortfolioName] = useState(
    type === 'edit' ? portfolioAccounts?.name : ''
  );

  const [portfolioIds, setPortfolioIds] = useState<string[]>(initialAccountIds);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioName(e.target.value);
  };

  const updatePortfolioIds = (id: string) => {
    if (portfolioIds.includes(id)) {
      setPortfolioIds(portfolioIds.filter((portfolioId) => portfolioId !== id));
    } else {
      setPortfolioIds([...portfolioIds, id]);
    }
  };

  const handlePortfolioSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selfPortfolio = {
      name: portfolioName,
      accountIds: portfolioIds,
    };

    onSubmit(selfPortfolio);
  };

  const removeDuplicateObjects = (arrayOne: AccountData[], arrayTwo: AccountData[]) =>
    arrayOne.filter(({ id: id1 }) => !arrayTwo.some(({ id: id2 }) => id2 === id1));

  // determines whether to render all accounts or all accounts minus selected accounts
  const renderCheckboxAccountSelectors = (
    accounts: AccountData[],
    selected: boolean,
    checkedAccount: boolean
  ) => {
    const filteredAccounts = removeDuplicateObjects(allAccounts, accounts);

    return (selected ? filteredAccounts : accounts).map((account) => (
      <CheckboxAccountSelector
        key={account.id}
        portfolioIds={portfolioIds}
        label={account.account}
        funds={account.balance}
        linked={account.linked}
        accountId={account.id}
        updatePortfolioIds={updatePortfolioIds}
        isChecked={checkedAccount}
      />
    ));
  };

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <StyledDialogContainer maxWidth="md" isMobile={isMobile} {...props}>
        <StyledBox display="flex" alignItems="flex-start" isMobile={isMobile}>
          <Grid item xs={10} container alignItems="center">
            {type === 'create' ? (
              <>
                <StyledIcon name="folderPlus" color="primary" />
                <Typography variant="h5" color="primary" colorShade="dark">
                  Create a portfolio
                </Typography>
              </>
            ) : (
              <>
                <StyledIcon name="edit" color="primary" />
                <Typography variant="h5" color="primary" colorShade="dark">
                  Edit portfolio
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={2} container justifyContent="flex-end">
            <StyledIconButton
              aria-label="close"
              onClick={() => onClose && onClose({}, 'escapeKeyDown')}
            >
              <Icon name="cross" />
            </StyledIconButton>
          </Grid>
        </StyledBox>

        <StyledDialogContent isMobile={isMobile}>
          <Spacer y={2} />
          <FormInput
            name="Portfolio Name"
            label="Portfolio Name"
            value={portfolioName}
            onChange={handleNameChange}
          />
          <Spacer y={5} />
          {type === 'edit' && (
            <>
              <Box display="flex" alignItems="flex-start">
                <Typography variant="sh5" color="grey" colorShade="dark1">
                  SELECTED ACCOUNTS
                </Typography>
              </Box>
              <Spacer y={2} />
              {portfolioAccounts &&
                renderCheckboxAccountSelectors(portfolioAccounts.accounts, false, true)}
            </>
          )}
          <Box display="flex" alignItems="flex-start">
            <Typography variant="sh5" color="grey" colorShade="dark1">
              ACCOUNTS
            </Typography>
          </Box>
          <Spacer y={2} />
          {type === 'edit' && portfolioAccounts
            ? renderCheckboxAccountSelectors(portfolioAccounts.accounts, true, false)
            : renderCheckboxAccountSelectors(allAccounts, false, false)}

          {!isMobile && <Spacer y={4} />}

          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            {...(isMobile ? { direction: 'column-reverse' } : {})}
          >
            {type === 'create' ? (
              <>
                <Grid>
                  <StyledButton
                    isMobile={isMobile}
                    variant="outlined"
                    color="error"
                    onClick={onClose as () => void}
                  >
                    Cancel
                  </StyledButton>
                </Grid>
                <Grid>
                  <form onSubmit={handlePortfolioSubmit} method="POST">
                    <StyledButton
                      isMobile={isMobile}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Create my portfolio
                    </StyledButton>
                  </form>
                </Grid>
              </>
            ) : (
              <>
                <Grid>
                  <StyledButton
                    isMobile={isMobile}
                    variant="outlined"
                    color="error"
                    onClick={onClose as () => void}
                  >
                    Delete portfolio
                  </StyledButton>
                </Grid>
                <Grid>
                  <form onSubmit={handlePortfolioSubmit} method="POST">
                    <StyledButton
                      isMobile={isMobile}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Save
                    </StyledButton>
                  </form>
                </Grid>
              </>
            )}
          </Grid>
        </StyledDialogContent>
      </StyledDialogContainer>
    </Grid>
  );
};

export default PortfolioModal;
