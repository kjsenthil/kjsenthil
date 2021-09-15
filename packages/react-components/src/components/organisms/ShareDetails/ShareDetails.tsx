import * as React from 'react';
import { Typography, Grid, Icon, IconProps, Divider, Spacer, LinkProps } from '../../atoms';
import { DateTime } from '../../molecules';
import { useBreakpoint } from '../../../hooks';
import { ItemContainer, ItemValue, LinkWithIcon, IconStyle } from './ShareDetails.styles';

export interface ShareDetailsProps {
  indicativePrice: string;
  indicativePriceTime: Date;
  cashAvailable: string;
  riskWarningNoticeHref: string;
  keyInvestorInformationDocumentRef: string;
  onCostAndChargesClick: () => void;
}

const Link = ({
  text,
  iconName,
  ...linkProps
}: {
  text: string;
  iconName: IconProps['name'];
} & LinkProps) => (
  <LinkWithIcon {...linkProps} variant="sh4">
    <IconStyle>
      <Icon name={iconName} fontSize="inherit" />
    </IconStyle>
    <Spacer x={1} />
    <span>{text}</span>
  </LinkWithIcon>
);

const ShareDetails = ({
  indicativePrice,
  indicativePriceTime,
  cashAvailable,
  riskWarningNoticeHref,
  keyInvestorInformationDocumentRef,
  onCostAndChargesClick,
}: ShareDetailsProps) => {
  const { isMobile } = useBreakpoint();

  return (
    <Grid container>
      <Grid item xs={12}>
        <ItemContainer container>
          <Grid item xs={6}>
            <Typography variant={isMobile ? 'sh2' : 'sh1'} color="primary" colorShade="dark2">
              Indicative prices as of
            </Typography>
          </Grid>
          <ItemValue item xs={6}>
            <DateTime date={indicativePriceTime} hideDate typographyProps={{ variant: 'h5' }} />
          </ItemValue>
        </ItemContainer>
        <Divider />
        <ItemContainer container>
          <Grid item xs={6}>
            <Typography variant="b4" color="primary" colorShade="dark2">
              Buy price (indicative)
            </Typography>
          </Grid>
          <ItemValue item xs={6}>
            <Typography variant="sh2" color="primary" colorShade="dark2">
              {indicativePrice}
            </Typography>
          </ItemValue>
        </ItemContainer>
        <Divider />
        <ItemContainer container>
          <Grid item xs={6}>
            <Typography variant="b4" color="primary" colorShade="dark2">
              Cash available to invest
            </Typography>
          </Grid>
          <ItemValue item xs={6}>
            <Typography variant="sh2" color="primary" colorShade="dark2">
              {cashAvailable}
            </Typography>
          </ItemValue>
        </ItemContainer>
      </Grid>
      <Grid item xs={12}>
        <Spacer y={3} />
        <Typography variant={isMobile ? 'sh3' : 'sh2'} color="primary" colorShade="dark2">
          The various types of stocks and shares available through OIS have differing categories and
          degrees of risk attached to them, influenced by world markets, interest and tax rates and
          other external factors.
        </Typography>
        <Spacer y={2} />
        <Typography variant="b4" color="primary" colorShade="dark2">
          Please read our Risk Warning Notice, which details the risks specific to each type of
          investment.
        </Typography>
        <Spacer y={2} />
        <Link text="Risk Warning Notice" href={riskWarningNoticeHref} iconName="link" />
        <Spacer y={2} />
        <Typography variant="b4" color="primary" colorShade="dark2">
          Where required, we have provided the Key Investor Information Document and cost and
          Charges disclosure. It is important that you read these documents to ensure that you
          understand the risks and objectives of the product and indicative costs prior to
          investing.
        </Typography>
        <Spacer y={2} />
        <Link
          text="Key Investor Information Document"
          href={keyInvestorInformationDocumentRef}
          iconName="book"
        />
        <Spacer y={2} />
        <Divider x={35} />
        <Spacer y={2} />
        <Link text="Cost and Charges disclosure" onClick={onCostAndChargesClick} iconName="link" />
      </Grid>
    </Grid>
  );
};
export default ShareDetails;
