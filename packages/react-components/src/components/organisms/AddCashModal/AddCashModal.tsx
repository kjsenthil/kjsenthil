import React, { useState } from 'react';
import { Button, Typography, Spacer } from '../../atoms';
import ModalWithHeader from '../../molecules/ModalWithHeader/ModalWithHeader';
import { FormInput, Alert } from '../../molecules';
import { useBreakpoint } from '../../../hooks';
import { formatCurrency, CurrencyPresentationVariant } from '../../../utils/formatters';

import {
  ModalContent,
  Form,
  ContentContainer,
  TextWrapper,
  ControlWrapper,
  TextContainer,
} from './AddCashModal.styles';

export interface AddCashModalProps {
  title: string;
  subTitle: string;
  accountType: string;
  isOpen: boolean;
  onClose: () => void;
  minAmount: number;
  maxAmount: number;
}
const AddCashModal = ({
  title,
  accountType,
  isOpen,
  onClose,
  minAmount,
  maxAmount,
}: AddCashModalProps) => {
  const { isMobile } = useBreakpoint();
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [amount, setAmount] = useState('');

  const formattedMaxAmount = formatCurrency(maxAmount, CurrencyPresentationVariant.ACTUAL_TOPLINE);
  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numericAmount: number = +amount;
    if (numericAmount <= minAmount) {
      setError(true);
      setErrorMessage('Minimum amount is £1.00');
    } else if (numericAmount > maxAmount) {
      setError(true);
      setErrorMessage(`Maximum amount is ${formattedMaxAmount}`);
    } else setError(false);
  };

  return (
    <ModalWithHeader
      modalTitle={title}
      subTitle="STOCK & SHARE ISA"
      open={isOpen}
      onClose={onClose}
      variant="withSubTitle"
      modalWidth="100%"
      headerBackgroundColor="#FFFFFF"
    >
      <ContentContainer isMobile={isMobile}>
        <TextWrapper>
          <ModalContent isMobile={isMobile}>
            <Typography variant="h4" component="h2" color="primary">
              1.
            </Typography>
            <TextContainer>
              <Typography
                variant="h4"
                component={isMobile ? 'h5' : 'h3'}
                color="primary"
                colorShade="dark2"
              >
                How much would you like to add to your account?
              </Typography>
              <Typography color="primary" colorShade="dark2">
                We&apos;ll debit the amount from your bank account immediately and save it in your{' '}
                {accountType} account. You can choose where to invest in later.
              </Typography>
            </TextContainer>
          </ModalContent>
        </TextWrapper>
        <ControlWrapper isMobile={isMobile}>
          <Form onSubmit={onFormSubmit} method="POST">
            <FormInput
              label="Amount"
              name="amount"
              value={amount}
              type="number"
              onChange={(event) => setAmount(event.target.value)}
              fullWidth
            />
            {isError && <Alert severity="error">{errorMessage}</Alert>}
            <Spacer y={isMobile ? 4 : 10} />
            <Button data-testid="close" variant="contained" color="primary" type="submit" fullWidth>
              Continue
            </Button>
          </Form>
        </ControlWrapper>
      </ContentContainer>
    </ModalWithHeader>
  );
};

export default AddCashModal;
