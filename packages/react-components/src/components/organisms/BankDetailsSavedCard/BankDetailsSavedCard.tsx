import React from 'react';
import { Spacer, Button, Typography } from '../../atoms';
import { useBreakpoint } from '../../../hooks';
import {
  AccNoSortCodeBoxAndEditButton,
  AccNoSortCodeBox,
  EditButtonBox,
  BankDetailsCard,
} from './BankDetailsSavedCard.styles';

export interface BankDetailsValuesProps {
  accountNumberValue: string;
  sortcodeValue: string;
  bankDetailsEditUrl: string;
}

const BankDetailsSavedCard = ({
  accountNumberValue,
  sortcodeValue,
  bankDetailsEditUrl,
}: BankDetailsValuesProps) => {
  const { isMobile } = useBreakpoint();

  return (
    <BankDetailsCard isMobile={isMobile}>
      <div>
        <Typography variant="sh3" color="primary">
          Bank details
        </Typography>

        <Spacer y={1} />

        <AccNoSortCodeBoxAndEditButton>
          <AccNoSortCodeBox>
            <Typography variant="b5" color="primary" colorShade="dark2">
              Acc No.
            </Typography>
            <Typography variant="b4" color="primary" colorShade="dark2">
              {accountNumberValue}
            </Typography>
            <Typography variant="b5" color="primary" colorShade="dark2">
              Sort code
            </Typography>
            <Typography variant="b4" color="primary" colorShade="dark2">
              {sortcodeValue}
            </Typography>
          </AccNoSortCodeBox>
          <EditButtonBox>
            <Button color="primary" size="small" variant="outlined" href={bankDetailsEditUrl}>
              Edit
            </Button>
          </EditButtonBox>
        </AccNoSortCodeBoxAndEditButton>
      </div>
    </BankDetailsCard>
  );
};

export default BankDetailsSavedCard;
