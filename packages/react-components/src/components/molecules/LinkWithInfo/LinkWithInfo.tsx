import React from 'react';
import { AnimateToggle } from '../../particles';
import { StyledLink, InfoBox, DividerTriangle } from './LinkWithInfo.styles';

export interface LinkWithInfoProps {
  linkText: string;
  renderInfo: React.ReactElement;
  expanded?: boolean;
}

const LinkWithInfo = ({ linkText, renderInfo, expanded }: LinkWithInfoProps) => {
  const [listExpanded, setListExpanded] = React.useState(expanded || false);

  const handleClick = () => {
    setListExpanded(!listExpanded);
  };

  return (
    <>
      <StyledLink variant="sh3" color="primary" colorShade="light1" onClick={handleClick}>
        {linkText}
      </StyledLink>

      <AnimateToggle isInline top={90} shouldShow={listExpanded} isFullWidth>
        <InfoBox>
          <DividerTriangle />
          {renderInfo}
        </InfoBox>
      </AnimateToggle>
    </>
  );
};

export default LinkWithInfo;
