import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import { NavPaths } from '../../../config/paths';
import { BasicInfo } from '../../../hooks';
import { RootState } from '../../../store';
import { MyAccountLayout } from '..';
import { NavLink, ButtonWithDropdown } from '../../molecules';
import { StyledHeader, StyledNav, StyledList } from './AccountDetailsLayout.styles';

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
    name: 'Withdraw cash',
    path: '/',
  },
  {
    name: 'Invest',
    path: '/',
  },
];

const AccountDetailsLayout = ({ basicInfo, children }: AccountDetailsLayoutProps) => {
  const { investmentAccounts } = useSelector((state: RootState) => ({
    investmentAccounts: state.investmentAccounts.data,
  }));

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
            {links.map((item) => (
              <NavLink key={`navlink-${item.name}`} to={item.path}>
                {item.name}
              </NavLink>
            ))}
          </StyledNav>
        </>
      }
    >
      {children}
    </MyAccountLayout>
  );
};

export default AccountDetailsLayout;
