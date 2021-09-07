import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useTheme } from '@material-ui/core';
import { Typography, Grid, Spacer, ProgressBar } from '../../atoms';
import TagBox from '../TagBox';
import ReceiptCard, { ReceiptCardProps } from '.';

const TIMEOUT = 5000;
const Bottom = () => {
  const { palette } = useTheme();
  const [color, setColor] = React.useState(palette.tertiary.main);
  const timer1 = setTimeout(() => setColor(palette.error.main), TIMEOUT - 100);

  React.useEffect(
    () => () => {
      clearTimeout(timer1);
    },
    [color]
  );
  return (
    <Grid container>
      <Grid item xs={12}>
        <Spacer y={3} />
        <ProgressBar
          progress={1}
          animationDuration={TIMEOUT / 1000}
          isAnimationLinear
          barBackgrounds={[color]}
        />
      </Grid>
    </Grid>
  );
};

export default {
  title: 'Digital Hybrid/Molecules/Receipt Card',
  component: ReceiptCard,
  argTypes: {
    shouldFillBottom: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
  },
} as Meta;

const props: Partial<ReceiptCardProps> = {
  items: [
    { key: 'Order Reference No.', value: 'BI - 12345678' },
    { key: 'Order Placed on', value: '2021-07-01' },
    { key: 'Order Expiry Date', value: 'N/A' },
    { key: 'Order Status', value: <TagBox variant="percentage">Pending</TagBox> },
    { key: 'Epic Code', value: 'BEM' },
    { key: 'Shares', value: 942 },
    { key: 'Quote & deal price', value: '1.00p' },
    { key: 'Order charges', value: '£7.50' },
  ],
  total: { key: 'Total order amount', value: '£1200.0' },
};
const Template: Story<ReceiptCardProps> = (args) => <ReceiptCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...props,
  listHeader: { key: 'Details of your transaction', value: 'Summary cost' },
};

export const WithCardHeader = Template.bind({});
WithCardHeader.args = {
  ...props,
  cardHeader: (
    <>
      <Typography variant="sh4" color="grey" colorShade="dark1">
        STOCKS & SHARES ISA
      </Typography>
      <Typography variant="h3">Beowul mining</Typography>
    </>
  ),
};

export const WithProgressBar = Template.bind({});
WithProgressBar.args = {
  ...Default.args,
  renderBottom: <Bottom />,
};
