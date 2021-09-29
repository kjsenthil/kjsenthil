import * as React from 'react';
import { useBreakpoint } from '../../../hooks';
import { Typography, Grid, Icon, Box } from '../../atoms';
import { Carousel } from '../../molecules';
import HowDoesItWorkCardImage from './CoachHowDoesItWork.styles';

const CoachHowDoesItWork = () => {
  const { isMobile } = useBreakpoint();

  const HowDoesItWorkTitle: string = 'How does it work?';
  const BookAppointmentText: string[] = [
    'Book an appointment',
    'You can choose to meet by phone or over a video call.',
  ];
  const QuestionnairesText: string[] = [
    'Fill out our questionnaires below',
    'These will help your coach to understand your objectives.',
  ];
  const TalkText: string[] = [
    'Talk with the coach',
    'Get expert help with your investments and financial plans.',
  ];

  return (
    <>
      {isMobile ? (
        <Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h3" color="primary" colorShade="dark2">
                {HowDoesItWorkTitle}
              </Typography>
            </Grid>

            <Grid item>
              <HowDoesItWorkCardImage
                src="\coach\howdoesitwork\howdoesitwork-image.webp"
                alt="HowDoesItWorkCardImage"
              />
            </Grid>

            <Grid item xs={12}>
              <Carousel settings={{ autoplay: true }}>
                <div>
                  <Icon name="calendar" color="primary" />

                  <Typography variant="sh2" gutterBottom color="primary" colorShade="dark2">
                    {BookAppointmentText[0]}
                  </Typography>

                  <Typography variant="b4" gutterBottom color="primary" colorShade="dark2">
                    {BookAppointmentText[1]}
                  </Typography>
                </div>

                <div>
                  <Icon name="edit" color="primary" />
                  <Typography variant="sh2" gutterBottom color="primary" colorShade="dark2">
                    {QuestionnairesText[0]}
                  </Typography>
                  <Typography variant="b4" gutterBottom color="primary" colorShade="dark2">
                    {QuestionnairesText[1]}
                  </Typography>
                </div>

                <div>
                  <Icon name="headset" color="primary" />
                  <Typography variant="sh2" gutterBottom color="primary" colorShade="dark2">
                    {TalkText[0]}
                  </Typography>
                  <Typography variant="b4" gutterBottom color="primary" colorShade="dark2">
                    {TalkText[1]}
                  </Typography>
                </div>
              </Carousel>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box p={3}>
          <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={5}>
              <Grid container alignItems="center" spacing={10}>
                <Grid item xs={12}>
                  <Typography variant="h2" color="primary" colorShade="dark2">
                    {HowDoesItWorkTitle}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                      <Icon name="calendar" color="primary" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="sh1" color="primary" colorShade="dark2">
                        {BookAppointmentText[0]}
                      </Typography>
                      <Typography variant="b3" color="primary" colorShade="dark2">
                        {BookAppointmentText[1]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                      <Icon name="edit" color="primary" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="sh1" color="primary" colorShade="dark2">
                        {QuestionnairesText[0]}
                      </Typography>
                      <Typography variant="b3" color="primary" colorShade="dark2">
                        {QuestionnairesText[1]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                      <Icon name="headset" color="primary" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="sh1" color="primary" colorShade="dark2">
                        {TalkText[0]}
                      </Typography>
                      <Typography variant="b3" color="primary" colorShade="dark2">
                        {TalkText[1]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={5}>
              <HowDoesItWorkCardImage
                src="\coach\howdoesitwork\howdoesitwork-image.webp"
                alt="HowDoesItWorkCardImage"
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default CoachHowDoesItWork;
