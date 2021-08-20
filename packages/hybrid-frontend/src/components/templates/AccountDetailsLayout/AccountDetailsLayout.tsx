import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from '@reach/router';
import {
  Box,
  Card,
  Icon,
  ListItemText,
  ListItem,
  ButtonWithDropdown,
  useBreakpoint,
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
  StyledList,
} from './AccountDetailsLayout.styles';

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
  const { investmentAccounts } = useSelector((state: RootState) => ({
    investmentAccounts: state.investmentAccounts.data,
  }));
  const { isMobile } = useBreakpoint();
  const currentUrl = useLocation().pathname;

  return (
    <MyAccountLayout
      basicInfo={basicInfo}
      accountDetailsMenu={
        <>
          <StyledHeader>
            {/* TODO - Add final dropdown styles */}
            <ButtonWithDropdown
              renderDropdown={
                <Card style={{ minWidth: 200 }}>
                  <StyledList>
                    {investmentAccounts?.map((item) => (
                      <ListItem button key={item.id}>
                        <ListItemText primary={item.accountName} />
                      </ListItem>
                    ))}
                  </StyledList>
                </Card>
              }
              label="select an account"
              color="primary"
              variant="contained"
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
      }
    >
      {children}
    </MyAccountLayout>
  );
};

export default AccountDetailsLayout;
