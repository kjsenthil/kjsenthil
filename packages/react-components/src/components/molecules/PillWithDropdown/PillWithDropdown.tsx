import React, { MouseEventHandler, useState } from 'react';
import { StyledMenu, PillIconDiv, StyledPillWithMenu, ParentDiv } from './PillWithDropdown.styles';
import {
  MenuItem,
  ListItemIcon,
  PillProps,
  Typography,
  TypographyProps,
  Icon,
  IconProps,
} from '../../atoms';

export interface MenuItemProps {
  label: string;
  iconProps: IconProps;
  typographyProps: TypographyProps;
  menuItemOnClickHandler: MouseEventHandler;
}

export interface PillWithDropdownProps extends Omit<PillProps, 'endIcon'> {
  pillLabel: string;
  menuItems: MenuItemProps[];
  pillOnClickHandler: (args: any) => any;
}

const PillWithDropdown = ({
  pillLabel,
  menuItems,
  pillOnClickHandler,
  ...pillProps
}: PillWithDropdownProps) => {
  const [pillStayExpanded, setPillStayExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const showMenuItems: MouseEventHandler = (event: React.MouseEvent<HTMLElement>) => {
    setPillStayExpanded(true);
    setAnchorEl(event.currentTarget.parentElement!.parentElement);
  };

  const closeMenuItems = () => {
    setPillStayExpanded(false);
    setAnchorEl(null);
  };

  return (
    <ParentDiv>
      <StyledPillWithMenu
        className="animate"
        variant="selected"
        onClick={pillOnClickHandler}
        pillStayExpanded={pillStayExpanded}
        endIcon={
          <PillIconDiv aria-controls="customized-menu" aria-haspopup="true" onClick={showMenuItems}>
            <Icon name="threeDots" />
          </PillIconDiv>
        }
        {...pillProps}
      >
        {pillLabel}
      </StyledPillWithMenu>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClick={closeMenuItems}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {menuItems.map((menuItem) => (
          <MenuItem onClick={menuItem.menuItemOnClickHandler} key={menuItem.label}>
            <ListItemIcon>
              <Icon {...menuItem.iconProps} />
            </ListItemIcon>
            <Typography {...menuItem.typographyProps}>{menuItem.label}</Typography>
          </MenuItem>
        ))}
      </StyledMenu>
    </ParentDiv>
  );
};

export default PillWithDropdown;
