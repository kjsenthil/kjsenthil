/* eslint-disable @typescript-eslint/dot-notation */
/* Disabled so that we can use dayjs()['add'] instead of dayjs().add(). This is a work around for
   this bug: https://github.com/storybookjs/storybook/issues/12208 */
import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';
import dayjs from 'dayjs';
import GoalProgressCardDetailed, {
  GoalProgressCardDetailedProps,
  GoalProgressCardStyle,
} from '../GoalProgressCardDetailed';
import { Spacer } from '../../../atoms';

const accounts = ['ISA', 'SIPP', 'GIA', 'ISA', 'GIA'];

export default {
  title: 'Digital Hybrid/Organisms/Goal Progress Card/Retirement',
  component: GoalProgressCardDetailed,
} as Meta;

const Template: Story<GoalProgressCardDetailedProps> = (args) => (
  <>
    <GoalProgressCardDetailed {...args} />
    <Spacer y={2} />
    <GoalProgressCardDetailed {...args} style={GoalProgressCardStyle.simple} />
  </>
);

export const NoLumpSumNotThereYet = Template.bind({});
NoLumpSumNotThereYet.storyName = 'No lump sum (not there yet)';
NoLumpSumNotThereYet.args = {
  name: 'Retirement',
  iconSrc: 'goals/large/retirement.jpg',
  lumpSumDate: undefined,
  startDate: dayjs()['add'](1, 'year').toDate(),
  endDate: dayjs()['add'](31, 'year').toDate(),
  ageAtLumpSumDate: undefined,
  ageAtStartDate: 57,
  ageAtEndDate: 87,
  affordableAmount: 840_000,
  affordableAmountUnderperform: 634_000,
  targetAmount: 1_975_000,
  shortfall: 1_135_000,
  onTrackPercentage: 0.425316,
  lumpSum: undefined,
  totalAffordableDrawdown: 840_000,
  remainingAmount: undefined,
  accounts,
} as GoalProgressCardDetailedProps;

export const NoLumpSumOngoing = Template.bind({});
NoLumpSumOngoing.storyName = 'No lump sum (ongoing)';
NoLumpSumOngoing.args = {
  name: 'Retirement',
  iconSrc: 'goals/large/retirement.jpg',
  lumpSumDate: undefined,
  startDate: dayjs().subtract(1, 'year').toDate(),
  endDate: dayjs()['add'](29, 'year').toDate(),
  ageAtLumpSumDate: undefined,
  ageAtStartDate: 57,
  ageAtEndDate: 87,
  affordableAmount: 840_000,
  affordableAmountUnderperform: 634_000,
  targetAmount: 1_975_000,
  shortfall: 1_135_000,
  onTrackPercentage: 0.425316,
  lumpSum: undefined,
  totalAffordableDrawdown: 840_000,
  remainingAmount: undefined,
  accounts,
} as GoalProgressCardDetailedProps;

export const NoLumpSumFinished = Template.bind({});
NoLumpSumFinished.storyName = 'No lump sum (finished)';
NoLumpSumFinished.args = {
  name: 'Retirement',
  iconSrc: 'goals/large/retirement.jpg',
  lumpSumDate: undefined,
  startDate: dayjs().subtract(31, 'year').toDate(),
  endDate: dayjs().subtract(1, 'year').toDate(),
  ageAtLumpSumDate: undefined,
  ageAtStartDate: 57,
  ageAtEndDate: 87,
  affordableAmount: 840_000,
  affordableAmountUnderperform: 634_000,
  targetAmount: 1_975_000,
  shortfall: 1_135_000,
  onTrackPercentage: 0.425316,
  lumpSum: undefined,
  totalAffordableDrawdown: 840_000,
  remainingAmount: undefined,
  accounts,
} as GoalProgressCardDetailedProps;

export const LumpSumNotThereYet = Template.bind({});
LumpSumNotThereYet.storyName = 'With lump sum (not there yet)';
LumpSumNotThereYet.args = {
  name: 'Retirement',
  iconSrc: 'goals/large/retirement.jpg',
  lumpSumDate: dayjs()['add'](1, 'year').toDate(),
  startDate: dayjs()['add'](11, 'year').toDate(),
  endDate: dayjs()['add'](31, 'year').toDate(),
  ageAtLumpSumDate: 57,
  ageAtStartDate: 67,
  ageAtEndDate: 87,
  affordableAmount: 840_000,
  affordableAmountUnderperform: 634_000,
  targetAmount: 1_975_000,
  shortfall: 1_135_000,
  onTrackPercentage: 0.425316,
  lumpSum: 210_000,
  totalAffordableDrawdown: 574_000,
  remainingAmount: 56_000,
  accounts,
} as GoalProgressCardDetailedProps;

export const LumpSumOngoing = Template.bind({});
LumpSumOngoing.storyName = 'With lump sum (ongoing)';
LumpSumOngoing.args = {
  name: 'Retirement',
  iconSrc: 'goals/large/retirement.jpg',
  lumpSumDate: dayjs().subtract(1, 'year').toDate(),
  startDate: dayjs()['add'](9, 'year').toDate(),
  endDate: dayjs()['add'](29, 'year').toDate(),
  ageAtLumpSumDate: 57,
  ageAtStartDate: 67,
  ageAtEndDate: 87,
  affordableAmount: 840_000,
  affordableAmountUnderperform: 634_000,
  targetAmount: 1_765_000,
  shortfall: 1_135_000,
  onTrackPercentage: 0.425316,
  lumpSum: 210_000,
  totalAffordableDrawdown: 574_000,
  remainingAmount: 56_000,
  accounts,
} as GoalProgressCardDetailedProps;

export const LumpSumFinished = Template.bind({});
LumpSumFinished.storyName = 'With lump sum (finished)';
LumpSumFinished.args = {
  name: 'Retirement',
  iconSrc: 'goals/large/retirement.jpg',
  lumpSumDate: dayjs().subtract(31, 'year').toDate(),
  startDate: dayjs().subtract(21, 'year').toDate(),
  endDate: dayjs().subtract(1, 'year').toDate(),
  ageAtLumpSumDate: 57,
  ageAtStartDate: 67,
  ageAtEndDate: 87,
  affordableAmount: 840_000,
  affordableAmountUnderperform: 634_000,
  targetAmount: 1_975_000,
  shortfall: 1_135_000,
  onTrackPercentage: 0.425316,
  lumpSum: 210_000,
  totalAffordableDrawdown: 574_000,
  remainingAmount: 56_000,
  accounts,
} as GoalProgressCardDetailedProps;
