import React from 'react';
import { Typography } from '../../atoms';

const ProjectionCalculateModal = () => (
  <>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      <b>How was this projection calculated?</b>
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      To create these forecasts, we’ve compared your current choice of investments with the closest
      Bestinvest Ready-made Portfolio. As we can’t ever guarantee investment performance, please use
      them as a rough indication of possible returns.
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" component="span" gutterBottom>
      We’ve based the projections on:
      <ul>
        <li>How much you have invested with us today</li>
        <li>The monthly contributions shown in the table</li>
        <li>The mix of investments that you currently have</li>
        <li>Your initial investment lump sum</li>
      </ul>
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      We’ve also taken into account any fees, charges and fund costs that you need to pay
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      <b>What is the projected value?</b>
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      The projections show how much your money could grow under different market conditions, based
      on the risk level of your investments. The fan chart shows the most likely return, together
      with a range of possible but less likely outcomes.
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      There’s a 10% chance your returns could be less than the lower line on the chart. But there’s
      also a 10% chance your returns could be higher than the top line of the chart.
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      <b>What about inflation and taxes?</b>
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      It’s important to remember that these forecasts don’t take into account inflation. This means
      your investments may not have the same value in real terms as they do today. For example, if
      you had £1,000 in 2008, you would need £1,300 today to have the same real value. This also
      shows why investing could be a better option than leaving money in cash.
    </Typography>
    <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
      Finally, the forecasts do not take into account any taxes you may need to pay on any gains -
      though you won’t need to pay any tax if you are investing with a Stocks & Shares ISA.
    </Typography>
  </>
);
export default ProjectionCalculateModal;
