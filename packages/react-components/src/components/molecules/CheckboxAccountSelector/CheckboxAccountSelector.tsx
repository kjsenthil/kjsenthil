import React from 'react';
import {
  StyledCheckbox,
  StyledRadioFormInput,
  StyledGrid,
  StyledTypography,
  StyledContainer,
  StyledInnerGrid,
} from './CheckboxAccountSelector.styles';
import { Typography, Spacer, Tooltip, Icon } from '../../atoms';
import TagBox from '../TagBox';
import { IconWrapper } from '../Legend/Legend.styles';
import { useBreakpoint } from '../../../hooks';
import { StaticTooltips } from '../../../constants/tooltips';

export interface CheckboxAccountSelectorProps {
  accountId: string;
  label: string;
  funds: string;
  linked?: boolean;
  updatePortfolioIds: (a: string) => void;
  portfolioIds: Array<string>;
}

const CheckboxAccountSelector = ({
  accountId,
  label,
  funds,
  linked,
  updatePortfolioIds,
}: CheckboxAccountSelectorProps) => {
  const { isMobile } = useBreakpoint();

  const checkHandler = (e: { target: { value: any } }) => {
    const { value } = e.target;
    updatePortfolioIds(value);
  };

  return (
    <StyledRadioFormInput
      isMobile={isMobile}
      value={accountId}
      control={<StyledCheckbox name={accountId} onChange={checkHandler} />}
      label={
        <StyledGrid>
          <Typography variant="sh3" color="primary" colorShade="dark2">
            {label}
          </Typography>
          <Spacer y={1} />
          <StyledInnerGrid container isMobile={isMobile} justifyContent="space-between">
            <StyledTypography variant="b3" color="primary" colorShade="dark2">
              £{funds}
            </StyledTypography>

            {linked && (
              <StyledContainer isMobile={isMobile}>
                <Spacer x={0.5} y={0} />
                <TagBox variant="account">linked</TagBox>
                <Spacer x={0.5} y={0} />
                <Tooltip title={StaticTooltips.linkedAccount}>
                  <IconWrapper>
                    <Icon
                      name="infoCircleIcon"
                      aria-label="more information"
                      color="inherit"
                      fontSize="inherit"
                    />
                  </IconWrapper>
                </Tooltip>
              </StyledContainer>
            )}
          </StyledInnerGrid>
        </StyledGrid>
      }
    />
  );
};

export default CheckboxAccountSelector;
