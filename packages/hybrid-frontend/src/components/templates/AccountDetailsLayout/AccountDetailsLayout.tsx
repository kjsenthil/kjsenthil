import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from '@reach/router';
import {
  Box,
  Card,
  Icon,
  ListItemText,
  useBreakpoint,
  DropdownToggle,
} from '@tswdts/react-components';
import { NavPaths } from '../../../config/paths';
import { BasicInfo } from '../../../hooks';
import { RootState } from '../../../store';
import { MyAccountLayout } from '..';
import {
  StyledHeader,
  StyledNav,
  StyledGrid,
  StyledLink,
  StyledListItem,
} from './AccountDetailsLayout.styles';
import { setSelectedAccount } from '../../../services/myAccount';

export interface AccountDetailsLayoutProps {
  children: React.ReactNode;
  basicInfo: BasicInfo;
}

// TODO - (Teal team) - add urls as pages are added
const links = [
  {
    name: 'Summary',
    path: '/summary',
  },
  {
    name: 'Performance',
    path: '/',
  },
  {
    name: 'Statistics',
    path: '/',
  },
  {
    name: 'Breakdown',
    path: '/',
  },
  {
    name: 'Transactions',
    path: '/',
  },
  {
    name: 'Add cash',
    path: NavPaths.ADD_CASH_PAGE,
  },
  {
    name: 'Monthly savings',
    path: '/',
  },
  {
    name: 'Withdraw cash',
    path: '/',
  },
  {
    name: 'Invest',
    path: '/',
    icon: <Icon name="waves" />,
  },
];

const AccountDetailsLayout = ({ basicInfo, children }: AccountDetailsLayoutProps) => {
  const { isMobile } = useBreakpoint();
  const currentUrl = useLocation().pathname;
  const dispatch = useDispatch();
  const { investmentAccounts } = useSelector((state: RootState) => ({
    investmentAccounts: state.investmentAccounts.data,
  }));
  const { selectedAccount } = useSelector((state: RootState) => ({
    selectedAccount: state.selectedAccount.account,
  }));
  const selected = selectedAccount?.accountName?.split(' - ');
  const [dropdownToggled, setDropdownToggled] = useState(false);

  const selectAccount = (account) => {
    dispatch(setSelectedAccount(account));
    setDropdownToggled(false);
  };

  useEffect(() => {
    if (investmentAccounts && Object.keys(selectedAccount).length === 0) {
      dispatch(setSelectedAccount(investmentAccounts[0]));
    }
  }, [investmentAccounts, selectedAccount]);

  return (
    <MyAccountLayout
      basicInfo={basicInfo}
      accountDetailsMenu={
        <>
          {investmentAccounts?.length && (
            <>
              <StyledHeader>
                <DropdownToggle
                  renderDropdown={
                    <Card>
                      {investmentAccounts?.map((item) => (
                        <StyledListItem button key={item.id} onClick={() => selectAccount(item)}>
                          <ListItemText primary={item.accountName} />
                        </StyledListItem>
                      ))}
                    </Card>
                  }
                  label={`${selectedAccount.accountNumber} - ${selected && selected[1]}`}
                  value={selected && selected[0]}
                  variant="h1"
                  dropdownToggled={dropdownToggled}
                  setDropdownToggled={setDropdownToggled}
                />
              </StyledHeader>
              <StyledNav>
                <Box px={isMobile ? 1 : 10}>
                  <StyledGrid isMobile={isMobile} container alignItems="center" wrap="nowrap">
                    {links.map((item) => (
                      <StyledLink
                        key={`navlink-${item.name}`}
                        to={item.path}
                        selected={item.path === currentUrl}
                      >
                        {item.icon}
                        {item.name}
                      </StyledLink>
                    ))}
                  </StyledGrid>
                </Box>
              </StyledNav>
            </>
          )}
        </>
      }
    >
      {children}
    </MyAccountLayout>
  );
};

export default AccountDetailsLayout;
