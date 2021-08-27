import React from 'react';
import { Typography, Grid, Button } from '../../atoms';
import ModalWithHeader from '../../molecules/ModalWithHeader';
import { ModalImage, SuccessDialogContainer, DialogMessage } from './SuccessModal.styles';
import { formatCurrency, CurrencyPresentationVariant } from '../../../utils/formatters';
import { useBreakpoint } from '../../../hooks';

export interface SuccessModalProps {
  title: string;
  accountName: string;
  amount: number;
  isOpen: boolean;
  imgSrc: string;
  imgAlt: string;
}
const SuccessModal = ({
  title,
  isOpen,
  accountName,
  amount,
  imgSrc,
  imgAlt,
}: SuccessModalProps) => {
  const { isMobile } = useBreakpoint();
  const formattedAmount = formatCurrency(amount, CurrencyPresentationVariant.ACTUAL_INLINE);
  return (
    <ModalWithHeader
      variant="DefaultTitle"
      modalTitle={title}
      open={isOpen}
      maxWidth="sm"
      modalBackgroundImgSrc="/add-cash-bk.png"
    >
      <Grid container spacing={2}>
        <SuccessDialogContainer>
          <Grid item xs={12}>
            <ModalImage src={imgSrc} alt={imgAlt} isMobile={isMobile} />
          </Grid>
          <Grid item xs={12} justify="center" justify-content="center">
            <DialogMessage isMobile={isMobile}>
              <Typography variant="b2" color="primary" colorShade="dark1">
                You&apos;ve successfully added {formattedAmount} to your
              </Typography>
              <Typography variant="b2" color="primary" colorShade="dark1">
                {accountName} account
              </Typography>
            </DialogMessage>
          </Grid>
        </SuccessDialogContainer>
        <Grid container item xs={4}>
          <Button
            data-testid="investnow"
            variant="outlined"
            color="primary"
            type="submit"
            fullWidth
          >
            Invest now
          </Button>
        </Grid>
        <Grid container item xs={8}>
          <Button data-testid="close" variant="contained" color="primary" fullWidth>
            Close
          </Button>
        </Grid>
      </Grid>
    </ModalWithHeader>
  );
};

export default SuccessModal;
