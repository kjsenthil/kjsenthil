import React from 'react';
import { formatDate } from '../../../utils/date';
import { StyledBox, StyledIcon } from './DateTime.styles';
import { Typography } from '../../atoms';

export interface DateTimeProps {
  date: Date;
  dateFormat?: string;
  timeFormat?: string;
  isExpiring?: boolean;
  showDate?: boolean;
}

const DateTime = ({
  date,
  dateFormat = 'DD-MMM-YYYY',
  timeFormat = 'H:mm A',
  isExpiring = true,
  showDate = true,
}: DateTimeProps) => {
  const formattedDate = formatDate(date, dateFormat);
  const formattedTime = formatDate(date, timeFormat);

  return (
    <StyledBox>
      {showDate ? (
        <Typography variant="sh2" color="primary" colorShade="dark2">
          {formattedDate}
        </Typography>
      ) : null}
      <Typography variant="sh2" color="primary" colorShade="dark2">
        <StyledIcon name="clock" isExpiring={isExpiring} />
        {formattedTime}
      </Typography>
    </StyledBox>
  );
};

export default DateTime;
