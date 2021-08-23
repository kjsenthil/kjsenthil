import React, { ChangeEvent, useState } from 'react';
import { useBreakpoint } from '../../../hooks';
import { Button, Divider, Grid, Icon, Tooltip } from '../../atoms';
import Select, { SelectProps } from '../../atoms/Select';
import {
  PillsNavigation,
  PillsNavigationTab,
  PillsNavigationSelectableTabComponent,
  PillNavigationCreatorTabComponent,
  PillNavigationOnChangeProps,
} from '../../molecules';

const AccountFilter = () => {
  const [currentValue, setCurrentValue] = useState('All accounts');
  const [openToolTip, setOpenToolTip] = useState(false);

  const { isMobile } = useBreakpoint();

  const handleNavigationChange = (e: ChangeEvent<{}>, newValue: string) => {
    setCurrentValue(newValue);
    setOpenToolTip((prevVal) => !prevVal);
  };

  const filterComponent = isMobile ? (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={10}>
        <Select
          value={currentValue}
          onChange={handleNavigationChange as SelectProps['onChange']}
          fullWidth
        >
          <option value="All accounts">All accounts</option>
          <option value="My accounts">My accounts</option>
          <option value="Linked accounts">Linked accounts</option>
        </Select>
      </Grid>
      <Grid item xs={1}>
        <Button variant="dashed" onClick={handleNavigationChange as any}>
          <Icon name="plus" />
        </Button>
      </Grid>
    </Grid>
  ) : (
    <PillsNavigation
      value={currentValue}
      onChange={handleNavigationChange as PillNavigationOnChangeProps}
    >
      <PillsNavigationTab
        component={PillsNavigationSelectableTabComponent}
        label="All accounts"
        value="All accounts"
      />

      <PillsNavigationTab
        component={PillsNavigationSelectableTabComponent}
        label="My accounts"
        value="My accounts"
      />

      <PillsNavigationTab
        component={PillsNavigationSelectableTabComponent}
        label="Linked accounts"
        value="Linked accounts"
      />

      <Divider orientation="vertical" y={4} />

      <PillsNavigationTab
        component={PillNavigationCreatorTabComponent}
        label="Create Portfolio"
        value="Create Portfolio"
      />
    </PillsNavigation>
  );

  return (
    <Tooltip title="Coming Soon" open={openToolTip} placement="top" arrow>
      {filterComponent}
    </Tooltip>
  );
};

export default AccountFilter;
