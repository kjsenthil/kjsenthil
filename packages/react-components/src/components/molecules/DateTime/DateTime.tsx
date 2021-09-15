import React from 'react';
import { formatDate } from '../../../utils/date';
import { StyledBox, StyledIcon } from './DateTime.styles';
import { Typography, TypographyProps } from '../../atoms';

export interface DateTimeProps {
  date: Date;
  dateFormat?: string;
  timeFormat?: string;
  isExpiring?: boolean;
  hideDate?: boolean;
  breakTime?: boolean;
  typographyProps?: TypographyProps;
}

const DateTime = ({
  date,
  dateFormat = 'DD-MMM-YYYY',
  timeFormat = 'H:mm A',
  isExpiring = true,
  hideDate = false,
  breakTime = false,
  typographyProps = {},
}: DateTimeProps) => {
  const formattedDate = formatDate(date, dateFormat);
  const formattedTime = formatDate(date, timeFormat);

  return (
    <StyledBox breakTime={breakTime}>
      {hideDate || (
        <Typography variant="sh2" color="primary" colorShade="dark2" {...typographyProps}>
          {formattedDate}
        </Typography>
      )}
      <div>
        <StyledIcon name="clock" isExpiring={isExpiring} fontSize="small" />
        <Typography variant="sh2" color="primary" colorShade="dark2" {...typographyProps}>
          {formattedTime}
        </Typography>
      </div>
    </StyledBox>
  );
};

export default DateTime;
