import * as React from 'react';
import { Pill, Grid, Typography, Spacer } from '../../atoms';
import {
  FormInput,
  ExpandableBulletList,
  RadioGroup,
  RadioFormInput,
  Banner,
} from '../../molecules';
import { StyledRadioGroup, StyledContactBox, StyledIcon } from './ShareOrderForm.styles';
import useBreakpoint from '../../../hooks/useBreakpoint';

type ExecutionType = 'market' | 'limit';
type OrderType = 'Buy' | 'Sell';

export interface ShareOrderFormProps {
  numOfUnits: string;
  numOfUnitsError: string;
  handleNumOfUnitsChange: (orderShareUnits: number) => void;

  orderType: OrderType;

  isMarketOpen: boolean;

  setExecutionType: (method: ExecutionType) => void;
  executionType: ExecutionType;

  desiredValue: string;
  desiredValueError: string;
  handleDesiredValueChange: (orderShareAmount: number) => void;

  amountInPence: string;
  amountInPenceError: string;
  handleAmountInPenceChange: (limitOrderChangeInPrice: number) => void;

  numberOfDays: string;
  numberOfDaysError: string;
  handleExpireAfterDaysChange: (limitOrderExpiryDays: number) => void;

  maxCashAvailable: string;
}

export interface BulletListProps {
  text: string;
  title: string;
  bullets: Array<string>;
}

const bulletList = (item: BulletListProps) => (
  <>
    <Typography variant="b4" color="primary" colorShade="dark2">
      {item.text}
    </Typography>
    <ExpandableBulletList title={item.title} bulletList={item.bullets} />
  </>
);

const ShareOrderForm = ({
  numOfUnits,
  numOfUnitsError,
  handleNumOfUnitsChange,
  orderType,
  isMarketOpen,
  setExecutionType,
  executionType,
  desiredValue,
  desiredValueError,
  handleDesiredValueChange,
  amountInPence,
  amountInPenceError,
  handleAmountInPenceChange,
  numberOfDays,
  numberOfDaysError,
  handleExpireAfterDaysChange,
  maxCashAvailable,
}: ShareOrderFormProps) => {
  const marketOrderBulletList: BulletListProps = {
    text: 'Quote & Deal gives you the exact share price of your order before you commit to it.',
    title: 'Quote & Deal',
    bullets: [
      'You can enter either a number of shares or an amount of cash to be invested/raised.',
      'We obtain a real-time price quote from the market and display it for the period the quote remains active, usually around 15 seconds.',
      'If you decide to accept the quote then we will attempt to execute your deal immediately.',
      'Quote & Deal can only be selected during market hours.',
      'The aim of a Quote & Deal order is to secure both price and execution.',
    ],
  };

  const limitOrderBulletList: BulletListProps = {
    text:
      'Limit orders are only dealt at the limit price specified by you or better. Ideal when you want to achieve a price that is better than the current share price.',
    title: 'limit orders',
    bullets: [
      'A Limit order can be placed at any time and be monitored for up to a maximum of 30 business days.',
      'You can enter either a number of shares of an amount of cash to be invested/raised.',
      'Limit orders guarantee price but not execution and you can ensure your order is dealt by selecting a different order type.',
    ],
  };

  const limitOrderAdditionalFields = (
    <>
      <Spacer y={1} />
      <Typography variant="sh2" gutterBottom>
        {orderType} when
      </Typography>
      <Typography variant="b5">
        Share price is less than or equal to (enter price in pence e.g 250p not £2.50)
      </Typography>
      <Spacer y={1} />
      <FormInput
        name="amount"
        label="Amount in pence"
        type="number"
        value={String(amountInPence || ' ')}
        error={amountInPenceError}
        hideNumberSpinButton
        fullWidth
        onChange={(e) => handleAmountInPenceChange(Number(e.target.value))}
      />

      <Spacer y={2} />
      <Typography variant="sh2" gutterBottom>
        Limit order to expire after
      </Typography>
      <Typography variant="b5">Set how many business days to hold this order</Typography>
      <Spacer y={1} />
      <FormInput
        name="days"
        label="Number of days"
        type="number"
        value={String(numberOfDays || ' ')}
        error={numberOfDaysError}
        hideNumberSpinButton
        fullWidth
        onChange={(e) => handleExpireAfterDaysChange(Number(e.target.value))}
      />
      <Spacer y={2} />
    </>
  );

  const { isMobile } = useBreakpoint();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={isMobile ? 12 : undefined}>
          <Pill
            title="marketOrder"
            variant={executionType === 'market' ? 'selected' : 'selectable'}
            disabled={!isMarketOpen}
            wrap="nowrap"
            onClick={() => setExecutionType('market')}
            role="button"
          >
            {orderType} now (Quote &amp; Deal)
          </Pill>
        </Grid>
        <Grid item xs={isMobile ? 12 : undefined}>
          <Pill
            title="limitOrder"
            variant={executionType === 'limit' || !isMarketOpen ? 'selected' : 'selectable'}
            wrap="nowrap"
            onClick={() => setExecutionType('limit')}
            role="button"
          >
            {orderType} via limit order
          </Pill>
        </Grid>
      </Grid>

      <Spacer y={2} />

      {executionType === 'market'
        ? bulletList(marketOrderBulletList)
        : bulletList(limitOrderBulletList)}

      <Spacer y={2} />

      <Typography variant="sh2" gutterBottom>
        Enter a specific number of shares or a cash amount
      </Typography>
      <Typography variant="b4" color="primary" colorShade="dark2" gutterBottom>
        Please enter whole numbers only, without commas or full stops. (e.g 5000).
      </Typography>

      <Spacer y={1} />

      <StyledRadioGroup>
        <RadioGroup defaultValue={Number(desiredValue) > 0 ? 'desiredValue' : 'numOfUnits'}>
          <RadioFormInput
            radioValue="numOfUnits"
            radioLabel="Specific number of units/shares"
            inputProps={{
              name: '',
              label: 'Number',
              isCurrency: false,
              value: numOfUnits,
              error: numOfUnitsError,
              onChange: (e) => handleNumOfUnitsChange(Number(e.target.value)),
            }}
          />
          <Spacer y={2} />
          <RadioFormInput
            radioValue="desiredValue"
            radioLabel={`Specific value* (maximum ${maxCashAvailable})`}
            inputProps={{
              name: '',
              label: 'Value',
              isCurrency: true,
              value: desiredValue,
              error: desiredValueError,
              onChange: (e) => handleDesiredValueChange(Number(e.target.value)),
            }}
            renderDetails={
              !!desiredValueError && (
                <>
                  <Spacer y={1} />
                  <Banner
                    title="Insufficient cash to pay for the purchase"
                    paragraph="The size of the order exceeds your available cash on account. Please add more cash to your account or reduce the order size."
                  />
                </>
              )
            }
          />
        </RadioGroup>
      </StyledRadioGroup>

      <Spacer y={1} />

      {executionType === 'market' ? null : limitOrderAdditionalFields}

      <Spacer y={3} />
      <StyledContactBox>
        <StyledIcon name="phone" color="primary" />
        <Spacer x={2} />
        <Grid item container>
          <Typography variant="b5" gutterBottom>
            If you require further information on the risks or features of this fund then please
            contact us on
          </Typography>

          <Typography variant="h5" color="primary" colorShade="dark2" gutterBottom>
            <Spacer y={1} />
            0207 189 2400
          </Typography>
        </Grid>
      </StyledContactBox>
    </>
  );
};

export default ShareOrderForm;
