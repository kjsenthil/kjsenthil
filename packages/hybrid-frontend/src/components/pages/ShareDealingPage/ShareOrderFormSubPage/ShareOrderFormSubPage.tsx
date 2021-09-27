import * as React from 'react';
import {
  Grid,
  Spacer,
  Banner,
  ShareDetails,
  ShareOrderForm,
  formatCurrency,
  CurrencyPresentationVariant,
} from '@tswdts/react-components';
import { SendEvent } from '../../../../hooks';
import { ShareDealingContext } from '../../../../services/shareDealing/machines/shareDealing';

interface ShareOrderFormSubPageProps {
  send: SendEvent;
  context: ShareDealingContext;
}

const ShareOrderFormSubPage = ({ send, context }: ShareOrderFormSubPageProps) => {
  const {
    errors,
    orderType,
    executionType,
    isMarketOpen,
    availableCash,
    orderShareUnits,
    indicativePrice,
    orderShareAmount,
    indicativePriceDate,
    limitOrderExpiryDays,
    limitOrderChangeInPrice,
  } = context;

  const formattedAvailableCash = formatCurrency(
    availableCash,
    CurrencyPresentationVariant.ACTUAL_INLINE
  );

  const displayError = (key: keyof Omit<ShareDealingContext['errors'], 'original' | 'fatal'>) => {
    if (errors.original) {
      return errors.original[errors[key]!] || '';
    }

    return errors[key] || '';
  };
  return (
    <Grid container spacing={0}>
      <Grid item md={12} lg={7}>
        {!context.isMarketOpen ? (
          <>
            <Banner
              title="The market is currently closed"
              paragraph="Quote and deal is available during market hours only"
            />
            <Spacer y={1} />
          </>
        ) : null}
        <ShareDetails
          indicativePrice={`${indicativePrice}p`}
          indicativePriceTime={indicativePriceDate!}
          cashAvailable={formattedAvailableCash}
          riskWarningNoticeHref="/"
          keyInvestorInformationDocumentRef="/"
          onCostAndChargesClick={() => {}}
        />
      </Grid>
      <Grid item md={12} lg={1}>
        <Spacer y={3} />
      </Grid>
      <Grid item md={12} lg={4}>
        <ShareOrderForm
          numOfUnits={String(orderShareUnits) || ''}
          numOfUnitsError={displayError('orderShareUnits')}
          desiredValue={String(orderShareAmount) || ''}
          desiredValueError={displayError('orderShareAmount')}
          isMarketOpen={isMarketOpen}
          orderType={orderType || 'Buy'}
          executionType={executionType || 'market'}
          amountInPence={String(limitOrderChangeInPrice) || ''}
          amountInPenceError={displayError('limitOrderChangeInPrice')}
          numberOfDays={String(limitOrderExpiryDays) || ''}
          numberOfDaysError={displayError('limitOrderExpiryDays')}
          handleAmountInPenceChange={(value) => {
            send('SET_LIMIT_ORDER_CHANGE_PRICE', { payload: { limitOrderChangeInPrice: value } });
          }}
          handleDesiredValueChange={(value) => {
            send('SET_ORDER_SHARE_AMOUNT', { payload: { orderShareAmount: value } });
          }}
          handleExpireAfterDaysChange={(value) => {
            send('SET_LIMIT_ORDER_EXPIRY_DAYS', { payload: { limitOrderExpiryDays: value } });
          }}
          handleNumOfUnitsChange={(value) => {
            send('SET_ORDER_SHARE_UNITS', { payload: { orderShareUnits: value } });
          }}
          setExecutionType={(method) => {
            if (method === 'market') {
              send('SET_MARKET_ORDER');
            } else if (method === 'limit') {
              send('SET_LIMIT_ORDER');
            }
          }}
          maxCashAvailable={formattedAvailableCash}
        />
      </Grid>
    </Grid>
  );
};

export default ShareOrderFormSubPage;
