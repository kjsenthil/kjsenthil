import * as React from 'react';
import { Grid, Typography, Link, Icon, Spacer } from '../../atoms';

const Footer = () => (
  <Grid container spacing={2} justify="flex-start">
    <Grid item xs={12}>
      <Grid container alignContent="center">
        <Typography variant="sh3" color="grey" colorShade="dark1" display="inline" gutterBottom>
          <Icon name="infoCircleIcon" fontSize="inherit" />
        </Typography>
        <Spacer x={1} />
        <Typography variant="sh3" color="grey" colorShade="dark1" display="inline" gutterBottom>
          The value of your investment can go down as well as up, and you can get back less than
          your originally invested.
        </Typography>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="b2" color="primary" colorShade="dark1" gutterBottom>
        Past performance or any yields quoted should not be considered reliable indicators of future
        returns. Restricted advice can be provided as part of other services offered by Bestinvest,
        upon request and on a fee basis. Before investing in funds please check the specific risk
        factors on the key features document or refer to our risk warning notice as some funds can
        be high risk or complex; they may also have risks relating to the geographical area,
        industry sector and/or underlying assets in which they invest. Prevailing tax rates and
        relief are dependent in your individual circumstances and are subject to change.
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={2} justify="flex-start">
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh3" color="primary" gutterBottom>
              Website Conditions
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh3" color="primary" gutterBottom>
              Cookie Policy
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh3" color="primary" gutterBottom>
              Key Facts and terms of business
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh3" color="primary" gutterBottom>
              Risk Warnings
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh3" color="primary" gutterBottom>
              Our registered Details
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="b3" color="primary" colorShade="dark1" gutterBottom>
        The Tilney Bestinvest Group of Companies comprises the firms Bestinvest (Brokers) Ltd (Reg.
        No. 2830297), Tilney Investment Management (reg. No. 02010520), Bestinvest (Consultants) Ltd
        (Reg. No. 1550116) and HW Financial Services Ltd (Reg. No. 02030706) all of which are
        authorised and regulated by the Financial Conduct Authority. Registered office: 6
        Chesterfield Gardens, Mayfair, W1J 5BO.
      </Typography>
    </Grid>
  </Grid>
);

export default Footer;
