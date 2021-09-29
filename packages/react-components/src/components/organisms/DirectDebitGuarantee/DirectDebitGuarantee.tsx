import React from 'react';
import { useBreakpoint } from '../../../hooks';
import { Typography, Spacer, Icon, Box } from '../../atoms';
import { LinkWithInfo } from '../../molecules';
import { StyledBox, BulletList, StyledDirectDebitIcon } from './DirectDebitGuarantee.styles';

const DirectDebitGuarantee = () => {
  const bullets = [
    'This Guarantee is offered by all banks and building societies that accept instructions to pay Direct Debits.',
    'If there are any changes to the amount, date or frequency of your Direct Debit, SEI Investments (Europe) Limited will notify you 5 working days in advance of your account being debited or as otherwise agreed. If you request SEI Investments (Europe) Limited to collect a payment, confirmation of the amount and date will be given to you at the time of the request.',
    'If an error is made in the payment of your Direct Debit, by SEI Investments (Europe) Limited or your bank or building society, you are entitled to a full and immediate refund of the amount paid from your bank or building society.',
    'If you receive a refund you are not entitled to, you must pay it back when SEI Investments (Europe) Limited asks you to.',
    'You can cancel a Direct Debit at any time by simply asking your bank or building society. Written confirmation may be required. Please also notify us.',
    'Direct debit payments from your account will appear as ‘SEI for Bestinvest’',
  ];

  const { isMobile } = useBreakpoint();

  const renderInfo = (
    <>
      <StyledBox isMobile={isMobile}>
        <Box display="flex" alignItems="center">
          <Icon name="infoCircleIcon" color="primary" />
          <Spacer x={1} />
          <Typography color="primary" colorShade="dark2" variant="sh3" component="div">
            Direct Debit Guarantee
          </Typography>
        </Box>

        <StyledDirectDebitIcon
          isMobile={isMobile}
          src="/direct-debit.png"
          alt="Direct Debit Guarantee"
        />
      </StyledBox>

      <BulletList role="list">
        {bullets.map((bullet) => (
          <li key={Math.random()}>
            <Typography color="primary" colorShade="dark2" variant="b4" component="div">
              {bullet}
            </Typography>
          </li>
        ))}
      </BulletList>
    </>
  );

  return (
    <LinkWithInfo linkText="Protected by the Direct Debit Guarantee" renderInfo={renderInfo} />
  );
};

export default DirectDebitGuarantee;
