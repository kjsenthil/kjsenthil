import React from 'react';
import { Button, Link, Typography } from '../../atoms';
import { SignpostModal } from '../../molecules';
import { StyledIcon, PopoverContainer } from './CoachingPopover.styles';

export interface CoachingPopoverProps {
  image: React.ReactElement;
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CoachingPopover = React.forwardRef<HTMLDivElement, CoachingPopoverProps>(
  ({ onButtonClick, image }, ref) => (
    <PopoverContainer>
      <SignpostModal
        title="Speak to a coach"
        content={
          <Typography variant="b4">
            Our coaches are qualified financial planners who can try to help you with{'\n'}
            goals and investments.{' '}
            <Link
              special
              color="primary"
              variant="sh3"
              colorShade="light1"
              href="https://www.bestinvest.co.uk/our-service/bestinvest-plus"
            >
              Learn more
            </Link>
          </Typography>
        }
        button={
          <Button
            startIcon={<StyledIcon name="calendar" />}
            color="gradient"
            onClick={onButtonClick}
          >
            Book an appointment
          </Button>
        }
        image={image}
        ref={ref}
      />
    </PopoverContainer>
  )
);

export default CoachingPopover;
