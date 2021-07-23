import * as React from 'react';
import useSideContentAndDividerTriangleYOffsetBasedOnUrlHash from '../GoalCreationLayoutExperimental/hooks/useSideContentAndDividerTriangleYOffsetBasedOnUrlHash';
import { useGoalCreationLayoutIsMobile } from '../GoalCreationLayoutExperimental';
import OverallLayout from './OverallLayout/OverallLayout';
import { ContentMain, ContentMainChildContainer } from './ContentMain/ContentMain.styles';
import ContentDivider from './ContentDivider/ContentDivider';
import { ContentSide } from './ContentSide/ContentSide.styles';
import ContentSideMover from './ContentSide/ContentSideMover';

type ElementRef = React.MutableRefObject<HTMLElement | null>;

export interface GoalCreationSubPageLayoutProps {
  currentUrlHash: string;

  // For each main content element, provide its ref so its position can be
  // determined by React and the side content can be moved around appropriately
  contentMain: Array<{ hash: string; ref: ElementRef; element: React.ReactNode }>;

  contentSide: React.ReactNode;

  // If true, Main content will be stacked horizontally from left to right on
  // mobile screens. They will then be scrolled left or right depending on the
  // current step
  // If false, Main content will be stacked vertically. User scroll normally.
  mainContentHorizontalSwipeOnMobile?: boolean;

  // If true, will stack Side content on top of Main content on mobile screens.
  // If false, will stack Main content on top of Side content on mobile screens.
  sideContentFirstOnMobile?: boolean;
}

export default function GoalCreationSubPageLayout({
  currentUrlHash,
  contentMain,
  contentSide,
  mainContentHorizontalSwipeOnMobile,
  sideContentFirstOnMobile,
}: GoalCreationSubPageLayoutProps) {
  const isMobile = useGoalCreationLayoutIsMobile();

  const overallLayoutElementRef = React.useRef<HTMLElement | null>(null);
  const sideContentElementRef = React.useRef<HTMLElement | null>(null);

  // We use the URL hash to determine which step the user is currently at.
  const {
    sideContentYOffset,
    dividerTriangleYOffset,
  } = useSideContentAndDividerTriangleYOffsetBasedOnUrlHash({
    currentUrlHash,
    overallLayoutElementRef,
    sideContentElementRef,
    mainContentElementsRefs: contentMain,
  });

  const renderContentMain = contentMain
    .map(({ hash: elementHash, element }) => {
      // If in "single-view-swipe" mode, we only show the main content relating
      // to the current URL hash.
      // If not, we show everything in a column-stacked manner.
      let show = !mainContentHorizontalSwipeOnMobile;
      if (mainContentHorizontalSwipeOnMobile) {
        show = isMobile ? currentUrlHash === elementHash : true;
      }

      return show ? (
        <ContentMainChildContainer key={elementHash}>{element}</ContentMainChildContainer>
      ) : null;
    })
    .filter((el) => !!el);

  // If there are no URL hash matches, we at least show the first main content,
  // if there is any.
  if (renderContentMain.length === 0 && contentMain.length > 0) {
    const { hash: elementHash, element } = contentMain[0];
    renderContentMain.push(
      <ContentMainChildContainer key={elementHash}>{element}</ContentMainChildContainer>
    );
  }

  return (
    <OverallLayout
      ref={overallLayoutElementRef}
      sideContentFirstOnMobile={!!sideContentFirstOnMobile}
    >
      <ContentMain>{renderContentMain}</ContentMain>

      <ContentDivider offsetY={dividerTriangleYOffset} />

      <ContentSide>
        <ContentSideMover ref={sideContentElementRef} offsetY={sideContentYOffset}>
          {contentSide}
        </ContentSideMover>
      </ContentSide>
    </OverallLayout>
  );
}