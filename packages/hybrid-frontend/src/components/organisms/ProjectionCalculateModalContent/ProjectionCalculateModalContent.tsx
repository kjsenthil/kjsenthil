import React from 'react';
import { Typography } from '../../atoms';

const ProjectionCalculateModal = () => (
  <>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      We have taken your current asset allocation and mapped it to the closest ready-made portfolio
      as a proxy to project forward a range of projected investment returns. The investment outcome
      for your portfolio is not guaranteed, and these forecasts should be considered indicative
      returns.
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      We have also factored in monthly contributions, as shown in the table, making the assumption
      these will be invested based on an equivalent asset allocation to your existing portfolio.
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      The calculation includes all fees and charges, and is based on your specified investment
      amounts and selected investment style. It shows the total return - it does not include the
      impact on your investment of inflation or any taxes you may be liable for.
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      The projections illustrate the potential investment growth your investments can make in
      different circumstances. Investment returns are not guaranteed or completely predictable.
      However, different asset types have different levels of risk and different levels of expected
      return. Based on in-house data we make forecast assumptions for the different portfolios. We
      calculate the most likely return, and less likely outcomes. The fan-chart shows a range of
      possible outcomes. The chance of the return being less than the lower value on the chart is
      10% - one time in ten we’d expect a poorer outcome. Similarly just 10% of the time the chance
      of return will be better than the top line on the fan-chart.
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      The fan chart factors in your initial lump sum, and assumes you continue to make regular
      investments at the level you have specified through the period.
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      The projected values do not factor in inflation - it is important to recognise that inflation
      over time means that your investment will not have the same value in real terms as today. By
      way of illustration £1000 in 2008 is the equivalent of around £1,300 today in real terms with
      what it could buy. (This also demonstrates the importance of investing rather than leaving
      your money in cash). They also do not include any taxes you may need to pay on your investment
      income or capital gains tax if you sell. These taxes only apply if you invest in a General
      Investment Account – they don’t apply to ISAs.
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      The calculations do include all of our costs and charges, and all fund costs.
    </Typography>
  </>
);
export default ProjectionCalculateModal;
