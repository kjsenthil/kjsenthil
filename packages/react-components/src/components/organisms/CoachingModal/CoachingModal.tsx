import React from 'react';
import { Button, Icon, Link, Typography } from '../../atoms';
import { SignpostModal } from '../../molecules';

export interface CoachingModalProps {
  image: React.ReactElement;
}

const CoachingModal = ({ image }: CoachingModalProps) => (
  <SignpostModal
    title="Speak to a coach"
    content={
      <Typography variant="b2">
        Our coaches are qualified financial planners who can try to help you with goals and
        investments.{' '}
        <Link
          special
          color="primary"
          colorShade="light1"
          href="https://www.bestinvest.co.uk/our-service/bestinvest-plus"
        >
          Learn more
        </Link>
      </Typography>
    }
    button={
      <Button
        startIcon={<Icon name="calendar" />}
        color="gradient"
        href="https://online.bestinvest.co.uk/bestinvest-plus#/"
      >
        Book an appointment
      </Button>
    }
    image={image}
  />
);

export default CoachingModal;
