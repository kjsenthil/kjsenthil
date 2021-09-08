import React from 'react';
import { useTheme, useMediaQuery } from '../../atoms';
import {
  StyledChildNavLink,
  StyledChildListItem,
  StyledDropDownContainer,
  StyledDropDownIcon,
  StyledList,
  StyledListItem,
  StyledNavLink,
} from './NavLinkWithDropDown.styles';

export interface NavLinkWithDropDownProps {
  name: string;
  path: string;
  type: string;
  childLinks?: NavLinkWithDropDownProps[];
  selected?: boolean;
  disabled?: boolean;
  navigate?: (path: string) => {};
}

const NavLinkWithDropDown: React.FC<NavLinkWithDropDownProps> = ({
  name,
  path,
  type,
  childLinks,
  selected,
  navigate,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [dropdownToggled, setDropdownToggled] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownToggled(!dropdownToggled);
  };

  return (
    <>
      <StyledDropDownContainer isMobile={isMobile}>
        <StyledListItem
          isMobile={isMobile}
          button={isMobile ? undefined : true}
          key={name}
          {...(type === 'link' && navigate
            ? {
                onClick: () => navigate(path),
              }
            : { onClick: toggleDropdown })}
        >
          <StyledNavLink isMobile={isMobile} selected={selected}>
            {name}
          </StyledNavLink>
        </StyledListItem>
        <StyledDropDownIcon
          isMobile={isMobile}
          aria-label={`open ${name} menu`}
          onClick={toggleDropdown}
          listExpanded={dropdownToggled}
          name="arrowHeadDown"
        />
      </StyledDropDownContainer>
      {dropdownToggled && (
        <StyledList isMobile={isMobile}>
          {childLinks?.map((childLink) => (
            <StyledChildListItem
              tabIndex={0}
              button
              key={childLink.name}
              {...(childLink.disabled || !navigate
                ? { disabled: true }
                : { onClick: () => navigate(childLink.path) })}
            >
              <StyledChildNavLink isMobile={isMobile}>{childLink.name}</StyledChildNavLink>
            </StyledChildListItem>
          ))}
        </StyledList>
      )}
    </>
  );
};

export default NavLinkWithDropDown;
