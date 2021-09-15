import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { InlineWidget } from 'react-calendly';
import { Prefill } from 'react-calendly/typings/calendly';
import { digitalHybridColors } from '../../../themes/colors';
import { StyledModal } from './CalendlyModal.styles';

export interface CalendlyModalProps {
  calendlyUrl: string;
  prefill?: Pick<Prefill, 'name' | 'email'>;
  open: boolean;
  onClose: () => void;
}

const formatColour = (colour: string) => colour.replace('#', '');

const CalendlyModal = ({ calendlyUrl, prefill, open, onClose }: CalendlyModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledModal
      modalTitle="Book an appointment"
      maxWidth="lg"
      maxHeight="md"
      open={open}
      onClose={onClose}
      isMobile={isMobile}
    >
      <InlineWidget
        prefill={prefill}
        styles={{
          maxWidth: '1000px',
          maxHeight: '675px',
          width: isMobile ? '100%' : '80vw',
          height: '80vh',
        }}
        url={calendlyUrl}
        pageSettings={{
          primaryColor: formatColour(digitalHybridColors.purple.main),
          backgroundColor: formatColour(digitalHybridColors.white.main),
          textColor: formatColour(digitalHybridColors.purple.dark2!),
        }}
      />
    </StyledModal>
  );
};

export default CalendlyModal;
