import React from 'react';
import { GridItem, ModalTitle, StyledBox, StyledPaper } from './SignpostModal.styles';

export interface SignpostModalProps {
  title: string;
  content: React.ReactElement;
  button: React.ReactElement;
  image?: React.ReactElement;
}

const SignpostModal = React.forwardRef<HTMLDivElement, SignpostModalProps>(
  ({ title, content, button, image }: SignpostModalProps, ref) => {
    const contentColSpan = image ? 1 : 2;

    return (
      <StyledPaper elevation={1} ref={ref}>
        <StyledBox>
          <GridItem colStart={1} colWidth={contentColSpan}>
            <ModalTitle>{title}</ModalTitle>
          </GridItem>
          <GridItem colStart={1} colWidth={contentColSpan}>
            {content}
          </GridItem>
          <GridItem colStart={1} colWidth={contentColSpan} alignSelf="end">
            {button}
          </GridItem>
          {image && (
            <GridItem colStart={2} colWidth={1} rowStart={1} rowHeight={3}>
              {image}
            </GridItem>
          )}
        </StyledBox>
      </StyledPaper>
    );
  }
);

export default SignpostModal;
