import React from 'react';
import { useBreakpoint } from '../../../hooks';
import { Button, Divider, Grid, Icon, PillProps, TabProps } from '../../atoms';
import Select from '../../atoms/Select';
import {
  DisabledComponent,
  PillNavigationCreatorTabComponent,
  PillNavigationOnChangeProps,
  PillsNavigation,
  PillsNavigationSelectableTabComponent,
  PillsNavigationTab,
} from '../../molecules';

interface AccountFilterOption {
  label: string;
  value: AccountFilterSelection;
}

export interface AccountFilterProps {
  hasLinkedAccounts: boolean;
  selection: string;
  onSelectionChanged: (newSelection: AccountFilterSelection) => void;
}

export enum AccountFilterSelection {
  ALL_ACCOUNTS = 'all-accounts',
  MY_ACCOUNTS = 'my-accounts',
  LINKED_ACCOUNTS = 'linked-accounts',
}

const CREATE_PORTFOLIO = 'create-portfolio';
const allAccountsOption: AccountFilterOption = {
  label: 'All accounts',
  value: AccountFilterSelection.ALL_ACCOUNTS,
};
const myAccountsOption: AccountFilterOption = {
  label: 'My accounts',
  value: AccountFilterSelection.MY_ACCOUNTS,
};
const linkedAccountsOption: AccountFilterOption = {
  label: 'Linked accounts',
  value: AccountFilterSelection.LINKED_ACCOUNTS,
};

const getFilterOptions = (hasLinkedAccounts: boolean) =>
  hasLinkedAccounts
    ? [allAccountsOption, myAccountsOption, linkedAccountsOption]
    : [allAccountsOption];

const CreatePortfolioPill: React.FC<PillProps & TabProps> = (props) => (
  <DisabledComponent title="Coming soon">
    <PillNavigationCreatorTabComponent {...props} />
  </DisabledComponent>
);

const AccountFilter = ({
  hasLinkedAccounts,
  selection,
  onSelectionChanged,
}: AccountFilterProps) => {
  const { isMobile } = useBreakpoint();

  const handleFilterChange = (newValue: string) => {
    if (newValue === CREATE_PORTFOLIO) {
      return;
    }
    onSelectionChanged(newValue as AccountFilterSelection);
  };

  const filterOptions = getFilterOptions(hasLinkedAccounts);

  return isMobile ? (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={10}>
        <Select
          value={selection}
          onChange={(event) => handleFilterChange(event.target.value as string)}
          fullWidth
        >
          {filterOptions.map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </Select>
      </Grid>
      <Grid item xs={1}>
        <DisabledComponent title="Coming soon">
          <Button variant="dashed">
            <Icon name="plus" />
          </Button>
        </DisabledComponent>
      </Grid>
    </Grid>
  ) : (
    <PillsNavigation
      value={selection}
      onChange={((_, value) => handleFilterChange(value)) as PillNavigationOnChangeProps}
    >
      {filterOptions.map(({ label, value }) => (
        <PillsNavigationTab
          component={PillsNavigationSelectableTabComponent}
          label={label}
          value={value}
          key={value}
        />
      ))}

      <Divider orientation="vertical" y={4} />

      <PillsNavigationTab
        component={CreatePortfolioPill}
        label="Create a portfolio"
        value={CREATE_PORTFOLIO}
      />
    </PillsNavigation>
  );
};

export default AccountFilter;
