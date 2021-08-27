import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ModalWithHeader, { ModalProps } from './ModalWithHeader';
import { Typography } from '../../atoms';

export default {
  title: 'Digital Hybrid/Molecules/Modal With Header',
  component: ModalWithHeader,
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
  },
} as Meta;

const Template: Story<ModalProps> = (args) => <ModalWithHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  modalTitle: 'Add Cash',
  subTitle: 'STOCK & SHARES ISA',
  variant: 'withSubTitle',
  children: (
    <>
      <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
        We have taken your current asset allocation and mapped it to the closest ready-made
        portfolio as a proxy to project forward a range of projected investment returns. The
        investment outcome for your portfolio is not guaranteed, and these forecasts should be
        considered indicative returns.
      </Typography>

      <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
        The fan chart factors in your initial lump sum, and assumes you continue to make regular
        investments at the level you have specified through the period.
      </Typography>
      <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
        The projected values do not factor in inflation - it is important to recognise that
        inflation over time means that your investment will not have the same value in real terms as
        today. By way of illustration £1000 in 2008 is the equivalent of around £1,300 today in real
        terms with what it could buy. (This also demonstrates the importance of investing rather
        than leaving your money in cash). They also do not include any taxes you may need to pay on
        your investment income or capital gains tax if you sell. These taxes only apply if you
        invest in a General Investment Account – they don’t apply to ISAs.
      </Typography>
      <Typography variant="b2" color="primary" colorShade="dark2" gutterBottom>
        The calculations do include all of our costs and charges, and all fund costs.
      </Typography>
    </>
  ),
};
