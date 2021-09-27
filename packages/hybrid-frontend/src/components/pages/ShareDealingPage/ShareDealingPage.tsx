import React from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import {
  Icon,
  Typography,
  LinearProgress,
  ConfirmationModal,
  Spacer,
} from '@tswdts/react-components';
import { useShareDealingMachine } from '../../../hooks';
import ShareDealingLayout, {
  ShareDealingLayoutProps,
} from '../../templates/ShareDealingLayout/ShareDealingLayout';
import ShareOrderFormSubPage from './ShareOrderFormSubPage';
import ShareDealingQuoteSubPage from './ShareDealingQuoteSubPage';
import ShareDealingConfirmedOrderSubPage from './ShareDealingConfirmedOrderSubPage';
import { AccountNames } from '../../../config';

export interface ShareDealingPageProps
  extends RouteComponentProps<{
    accountId: number;
    isin: string;
    orderType: 'buy' | 'sell';
  }> {}

const goToAccountsPage = () => navigate('/my-account');

const ShareDealingPage = ({
  accountId = 0,
  isin = '',
  orderType = 'buy',
}: ShareDealingPageProps) => {
  const {
    state: { context, matches },
    send,
    service,
    isLoading,
  } = useShareDealingMachine({
    accountId,
    isin,
  });

  const {
    accountName,
    shareName,
    canGetQuote,
    quote,
    quoteExpiryInMs,
    order,
    executionType,
  } = context;

  service.onTransition(({ done }) => {
    if (done) {
      goToAccountsPage();
    }
  });

  const orderTypeLowerCase = orderType.toLowerCase();

  React.useEffect(() => {
    if (orderTypeLowerCase === 'sell') {
      send('START_SELLING_ORDER');
    } else if (orderTypeLowerCase === 'buy') {
      send('START_BUYING_ORDER');
    }
  }, []);

  let children: React.ReactNode = null;

  const isCreatingOrder = [
    'ordering.creatingOrder.marketOrder',
    'ordering.creatingOrder.limitOrder',
  ].some(matches);

  const isPreviewingQuote = matches('ordering.previewingQuote');
  const hasQuoteExpired = matches('ordering.previewingQuote.expiredQuote');
  const isCancelling = matches('cancelling');
  const isFailed = matches('failure');
  const isSuccessful = matches('success');

  const shareDealingLayoutProps: Omit<ShareDealingLayoutProps, 'children'> = {
    open: !isCancelling,
    isEndState: isSuccessful || isFailed,
    titleText: shareName!,
    titleSubText: accountName ? AccountNames[accountName] : '',
    onClose: goToAccountsPage,
  };

  if (isLoading) {
    children = <LinearProgress color="primary" />;
  } else if (isCreatingOrder) {
    shareDealingLayoutProps.primaryActionProps = {
      onClick: () => {
        send('GET_QUOTE');
      },
      children: 'Continue',
      disabled: !canGetQuote,
    };
    children = <ShareOrderFormSubPage send={send} context={context} />;
  } else if (isPreviewingQuote) {
    shareDealingLayoutProps.primaryActionProps = {
      onClick: () => {
        send('CONFIRM_ORDER');
      },
      children: 'Confirm order',
    };

    shareDealingLayoutProps.secondaryActionProps = {
      onClick: () => {
        send('CANCEL_ORDER');
      },
      children: 'Cancel order',
      startIcon: <Icon name="cross" />,
    };

    if (hasQuoteExpired) {
      shareDealingLayoutProps.primaryActionProps = {
        onClick: () => {
          send('REQUOTE_ORDER');
        },
        children: 'Re-quote order',
        startIcon: <Icon name="refresh" />,
        variant: 'outlined',
      };
    }

    const onEdit = () => {
      send('EDIT_ORDER');
    };

    children = (
      <ShareDealingQuoteSubPage
        quote={quote!}
        onEdit={onEdit}
        shareName={shareName!}
        executionType={executionType!}
        quoteExpiryInMs={quoteExpiryInMs}
        hasQuoteExpired={hasQuoteExpired}
      />
    );
  } else if (isFailed) {
    children = (
      <>
        <Spacer y={4} />
        <Typography align="center" variant="h3">
          Something went wrong!
        </Typography>
        <Spacer y={1} />
        <Typography align="center" variant="b2">
          Please try again later!
        </Typography>
      </>
    );
  } else if (isSuccessful) {
    shareDealingLayoutProps.titleText = 'Success!';
    shareDealingLayoutProps.titleSubText = "We've received your request to buy shares.";
    shareDealingLayoutProps.primaryActionProps = {
      onClick: () => {},
      children: 'View transactions',
    };

    shareDealingLayoutProps.secondaryActionProps = {
      onClick: () => {
        send('PLACE_ANOTHER_ORDER');
      },
      children: 'Place another order',
    };

    children = (
      <ShareDealingConfirmedOrderSubPage
        order={order!}
        executionType={executionType!}
        accountName={shareDealingLayoutProps.titleSubText}
      />
    );
  }

  if (isCancelling) {
    return (
      <ConfirmationModal
        open
        title="Are you sure?"
        message="Are you sure you want to cancel this order?"
        icon={{ name: 'infoCircleIcon', color: 'primary' }}
        buttons={[
          {
            label: 'Confirm',
            variant: 'contained',
            color: 'primary',
            handler: () => {
              send('CONFIRM_CANCELLATION');
            },
          },
          {
            label: 'Cancel',
            variant: 'outlined',
            color: 'primary',
            handler: () => {
              send('CANCEL_CANCELLATION');
            },
          },
        ]}
      />
    );
  }
  return <ShareDealingLayout {...shareDealingLayoutProps}>{children}</ShareDealingLayout>;
};

export default ShareDealingPage;
