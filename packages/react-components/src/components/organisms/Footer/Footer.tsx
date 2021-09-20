import * as React from 'react';
import { Grid, Typography, Link, Divider } from '../../atoms';

const Footer = () => (
  <Grid container spacing={2} justifyContent="flex-start">
    <Grid item xs={12}>
      <Grid container alignContent="center">
        <Typography variant="sh2" color="primary" colorShade="dark1" display="inline" gutterBottom>
          The value of your investment can go down as well as up, and you can get back less than
          your originally invested.
        </Typography>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="b3" color="primary" colorShade="dark1" gutterBottom>
        Past performance or any yields quoted should not be considered reliable indicators of future
        returns. Restricted advice can be provided as part of other services offered by Bestinvest,
        upon request and on a fee basis. Before investing in funds please check the specific risk
        factors on the key features document or refer to our risk warning notice as some funds can
        be high risk or complex; they may also have risks relating to the geographical area,
        industry sector and/or underlying assets in which they invest. Tax legislation is that
        prevailing at the time, is subject to change without notice and depends on individual
        circumstances. Clients should always seek appropriate tax advice before making decisions.
      </Typography>
      <Divider y={6} />
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh4" color="primary" gutterBottom>
              Accessibility
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh4" color="primary" gutterBottom>
              Cookie Policy
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh4" color="primary" noWrap gutterBottom>
              Website conditions
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh4" color="primary" gutterBottom>
              Privacy notice
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh4" color="primary" gutterBottom>
              Risk Warnings
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link href="#">
            <Typography variant="sh4" color="primary" noWrap gutterBottom>
              Keeping your account secure
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="b5" color="primary" colorShade="dark1" gutterBottom>
        Issued by Tilney Investment Management Services Limited, (Reg. No: 2830297). Authorised and
        regulated by the Financial Conduct Authority. Financial services are provided by Tilney
        Investment Management Services Limited and other companies in the Tilney Smith & Williamson
        Group, further details of which are available here. This site is for UK investors only. ©
        Tilney Smith & Williamson Limited 2021.
      </Typography>
    </Grid>
  </Grid>
);

export default Footer;
