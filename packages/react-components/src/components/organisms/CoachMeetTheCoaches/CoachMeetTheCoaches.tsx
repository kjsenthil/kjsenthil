import * as React from 'react';
import { useBreakpoint } from '../../../hooks';
import { Typography, Grid, Spacer, TypographyProps } from '../../atoms';
import { Carousel } from '../../molecules';
import {
  StyledBox,
  StyledImageContainer,
  StyledBioContainer,
  StyledGrid,
} from './CoachMeetTheCoaches.styles';

export interface MeetTheCoachesProps {
  coaches: {
    name: string;
    bio: string;
    image: string;
  }[];
}

const CoachMeetTheCoaches = ({ coaches }: MeetTheCoachesProps) => {
  const { isMobile } = useBreakpoint();

  const mobileCarousel = coaches.map((coach) => (
    <div key={coach.name}>
      <StyledImageContainer>
        {coach.image && <img src={coach.image} alt={coach.name} width="104px" height="104px" />}
      </StyledImageContainer>
      {coach.name && (
        <Typography variant="sh3" gutterBottom color="primary" align="center">
          {coach.name}
        </Typography>
      )}
      <Spacer y={1} />
      {coach.bio && (
        <StyledBioContainer>
          <Typography variant="sh3" color="grey" colorShade="dark1" align="center">
            {coach.bio}
          </Typography>
        </StyledBioContainer>
      )}
    </div>
  ));

  const desktopCoach = (image: string, name: string, bio: string) => (
    <Grid item xs={4}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={3} md={3}>
          <img src={image} alt={name} width="104px" height="104px" />
        </Grid>
        <StyledGrid item md={8} lg={9}>
          <Typography variant="sh3" gutterBottom color="primary">
            {name}
          </Typography>
          <Typography variant="sh3" color="grey" colorShade="dark1">
            {bio}
          </Typography>
        </StyledGrid>
      </Grid>
    </Grid>
  );

  const desktopCarousel = () => {
    const tripleCoachCard: React.ReactNode[] = [];
    for (let i = 0; i < coaches.length; i += 3) {
      tripleCoachCard.push(
        <div key={`${coaches[i]} ${coaches[i + 1]} ${coaches[i + 2]}`}>
          <Grid container alignItems="center" justifyContent="space-between">
            {desktopCoach(coaches[i].image, coaches[i].name, coaches[i].bio)}

            {coaches[i + 1] &&
              desktopCoach(coaches[i + 1].image, coaches[i + 1].name, coaches[i + 1].bio)}
            {coaches[i + 2] &&
              desktopCoach(coaches[i + 2].image, coaches[i + 2].name, coaches[i + 2].bio)}
          </Grid>
        </div>
      );
    }
    return tripleCoachCard;
  };

  const coachInfo = (
    nameVariant: TypographyProps['variant'],
    textAlign: TypographyProps['align']
  ) => (
    <>
      <Grid item xs={12}>
        <Typography variant={nameVariant} color="primary" colorShade="dark2" align={textAlign}>
          Meet our coaches
        </Typography>
        {!isMobile && <Spacer y={2} />}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="sh1" color="grey" colorShade="dark1" align={textAlign}>
          All our coaches hold the Chartered Insurance Institute (CII) Diploma in Regulated
          Financial Planning.
        </Typography>
      </Grid>
    </>
  );

  return (
    <StyledBox p={3} pb={5} isMobile={isMobile}>
      {isMobile ? (
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          data-testid="meet-the-coach-mobile"
        >
          {coachInfo('h4', 'center')}

          <Grid item xs={12}>
            <Carousel settings={{ autoplay: true }}>{mobileCarousel}</Carousel>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1} data-testid="meet-the-coach-desktop">
          <Grid item xs={12}>
            <Grid container>{coachInfo('h2', 'left')}</Grid>
            <Spacer y={5} />
            <Carousel settings={{ autoplay: true }}>{desktopCarousel()}</Carousel>
          </Grid>
        </Grid>
      )}
    </StyledBox>
  );
};

export default CoachMeetTheCoaches;
