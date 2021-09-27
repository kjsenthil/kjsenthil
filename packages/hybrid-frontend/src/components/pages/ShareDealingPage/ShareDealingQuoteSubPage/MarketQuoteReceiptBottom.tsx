import * as React from 'react';
import { useTheme, Grid, Spacer, Banner, Typography, ProgressBar } from '@tswdts/react-components';
import Countdown from 'react-countdown';
import { useSpring, animated } from '@react-spring/web';
import { StyledIcon } from './ShareDealingQuoteSubPage.styles';

export interface MarketQuoteReceiptBottomProps {
  quoteExpiryInMs: number;
  hasQuoteExpired: boolean;
}

const MarketQuoteReceiptBottom = ({
  quoteExpiryInMs,
  hasQuoteExpired,
}: MarketQuoteReceiptBottomProps) => {
  const { palette } = useTheme();
  const validQuoteColor = palette.tertiary.main;
  const expiredQuoteColor = palette.error.main;
  const [color, setColor] = React.useState(validQuoteColor);

  React.useEffect(() => {
    if (hasQuoteExpired) {
      setColor(expiredQuoteColor);
    }
  }, [hasQuoteExpired]);

  const renderCountdown = () => (
    <Countdown
      date={Date.now() + quoteExpiryInMs}
      renderer={({ minutes, seconds }) =>
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      }
    />
  );

  const styles = useSpring({
    opacity: hasQuoteExpired ? 1 : 0,
    marginTop: hasQuoteExpired ? 0 : -1000,
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Spacer y={3} />
        <ProgressBar
          progress={1}
          animationDuration={hasQuoteExpired ? 0 : quoteExpiryInMs / 1000}
          isAnimationLinear
          barBackgrounds={[color]}
          reverseAnimation
        />
      </Grid>
      <Grid item xs={12}>
        <Spacer y={3} />
        <Grid
          item
          container
          justifyContent="flex-end"
          spacing={1}
          alignItems="center"
          alignContent="center"
        >
          <Grid item>
            <StyledIcon name="clock" hasQuoteExpired={hasQuoteExpired} />
          </Grid>
          <Grid item>
            <Typography variant="sh3">Quote held for</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{hasQuoteExpired ? '00:00' : renderCountdown()}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Spacer y={3} />
        <animated.div className="box" style={styles}>
          <Banner
            icon="errorCircle"
            paragraph="Please click 'Re-quote order' to quote again. Alternatively you can edit or cancel your order."
            title="The time limit for your 'quote and deal' price has expired"
          />
        </animated.div>
      </Grid>
    </Grid>
  );
};

export default MarketQuoteReceiptBottom;
