import React from 'react';
import { Typography } from '../../atoms';
import { AnimateToggle } from '../../particles';
import { StyledButton, BulletList, StyledIcon } from './ExpandableBulletList.styles';

export interface ExpandableBulletListProps {
  bulletList: string[];
  title: string;
  /**
   * Should the bullet list default to expanded on first render
   */
  expanded?: boolean;
}

const ExpandableBulletList = ({ bulletList, expanded, title }: ExpandableBulletListProps) => {
  const [listExpanded, setListExpanded] = React.useState(expanded || false);

  const handleClick = () => {
    setListExpanded(!listExpanded);
  };

  return (
    <>
      <StyledButton
        aria-expanded={listExpanded}
        variant={undefined}
        color="inherit"
        fullWidth
        onClick={handleClick}
      >
        {listExpanded ? 'Less about' : 'More about'} {title}
        <StyledIcon listExpanded={listExpanded} name="arrowHeadDown" />
      </StyledButton>
      <AnimateToggle isInline top={90} shouldShow={listExpanded} isFullWidth>
        <BulletList role="list">
          {bulletList.map((bullet) => (
            <li key={Math.random()}>
              <Typography color="primary" colorShade="dark2" variant="b4" component="div">
                {bullet}
              </Typography>
            </li>
          ))}
        </BulletList>
      </AnimateToggle>
    </>
  );
};

export default ExpandableBulletList;
