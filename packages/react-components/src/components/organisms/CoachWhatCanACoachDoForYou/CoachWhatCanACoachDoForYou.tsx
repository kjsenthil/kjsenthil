import * as React from 'react';
import { useBreakpoint } from '../../../hooks';
import { Grid, Link, Spacer, Typography } from '../../atoms';
import { Carousel } from '../../molecules';
import { StyledIcon, StyledBox } from './CoachWhatCanACoachDoForYou.styles';

interface WhatCanACoachDoForYouTile {
  icon: string;
  title: string;
  text: string;
  postTextLink?: {
    text: string;
    href: string;
  };
}

const sectionTitle: string = 'What can a coach do for you?';
const subtitle: string =
  'All our coaches are qualified financial planners and can help you understand how to ' +
  'achieve your investment goals, fine-tune your strategy and even help you get to where ' +
  'you want to be sooner.';

export const tiles: WhatCanACoachDoForYouTile[] = [
  {
    icon: 'rocket',
    title: 'Goal-based investing',
    text:
      'If you know what you want to achieve but you’re not sure how to get there, ' +
      'our coaches can help you put a plan into place.',
  },
  {
    icon: 'idea',
    title: 'Exploring your options',
    text:
      'If you want to understand your options before investing, ' +
      'you can use a coaching session to talk through your choices.',
  },
  {
    icon: 'team',
    title: 'Making use of advice',
    text:
      'If you’re looking for personalised investment advice, ' +
      'you could discuss our low-cost advice packages with your coach. ',
    postTextLink: {
      text: 'More on advice',
      href: 'https://google.com',
    },
  },
];

const Title = ({ fontVariant }) => (
  <Grid item xs={12}>
    <Typography variant={fontVariant} color="primary" colorShade="dark2">
      {sectionTitle}
    </Typography>
  </Grid>
);

const Subtitle = () => (
  <Grid item xs={12}>
    <Typography variant="sh1" color="grey" colorShade="dark1">
      {`${subtitle} `}
      <Link special color="primary" colorShade="light1" variant="sh1" href="https://www.google.com">
        Find out more
      </Link>
    </Typography>
  </Grid>
);

const Tile = ({ icon, title, text, postTextLink }: WhatCanACoachDoForYouTile) => (
  <div key={icon}>
    <StyledIcon name={icon} color="primary" />
    <Spacer y={2.25} />
    <Typography variant="sh2" color="primary" colorShade="dark2">
      {title}
    </Typography>
    <Spacer y={1.5} />
    <Typography variant="sh3" color="grey" colorShade="dark1">
      {text}
      {postTextLink && (
        <Link special color="primary" colorShade="light1" variant="sh3" href={postTextLink.href}>
          {postTextLink.text}
        </Link>
      )}
    </Typography>
  </div>
);

const CoachWhatCanACoachDoForYou = () => {
  const { isMobile } = useBreakpoint();

  return (
    <>
      {isMobile ? (
        <StyledBox>
          <Grid container xs={12} spacing={4} direction="column" alignItems="center">
            <Grid item>
              <Title fontVariant="h3" />
              <Spacer y={2} />
              <Subtitle />
            </Grid>

            <Grid item xs={12}>
              <Carousel>
                {tiles.map((tileProps) => (
                  <Tile key={tileProps.icon} {...tileProps} />
                ))}
              </Carousel>
            </Grid>
          </Grid>
        </StyledBox>
      ) : (
        <StyledBox p={3}>
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <Title fontVariant="h2" />
              <Spacer y={2} />
              <Subtitle />
            </Grid>

            <Grid container item spacing={10} xs={12}>
              {tiles.map((tileProps) => (
                <Grid key={tileProps.icon} item xs={4}>
                  <Tile {...tileProps} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </StyledBox>
      )}
    </>
  );
};

export default CoachWhatCanACoachDoForYou;
