import { ConditionPredicate } from 'xstate';
import {
  ProfileCreationEvents,
  DoneInvokeSubmittingProfileEvent,
  ProfileCreationContext,
  DoneInvokeSubmittingAmlEvent,
} from './types';

const isAllUk = ({
  countryTaxLiability: { citizenshipCountry, paysTaxInUK, countryOfBirth },
}: ProfileCreationContext) =>
  countryOfBirth === 'GB' && citizenshipCountry === 'GB' && !!paysTaxInUK;

const canContinueFromSettingAccountType = (ctx: ProfileCreationContext) =>
  ctx.canContinue.fromSettingAccountType;

const canContinueFromCreatingCredentials = (ctx: ProfileCreationContext) =>
  ctx.canContinue.fromCreatingCredentials;

const canContinueFromSettingPersonalDetails = (ctx: ProfileCreationContext) =>
  ctx.canContinue.fromSettingPersonalDetails;

const canContinueFromCountryTaxLiability = (ctx: ProfileCreationContext) =>
  ctx.canContinue.fromCountryTaxLiability;

const canContinueFromEnhancedAml = (ctx: ProfileCreationContext) => ctx.canContinue.fromEnhancedAml;

const doesNotNeedAmlChecks = (ctx: ProfileCreationContext) => !ctx.needsEnhancedAml;

const canContinueFromAdditionalDetails = (ctx: ProfileCreationContext) =>
  ctx.canContinue.fromAdditionalDetails;

const oneOfTheFatcaAnswersIsYes = ({ fatcaQuestions }: ProfileCreationContext) => {
  let hasYesAnswer = false;
  if (fatcaQuestions) {
    Object.values(fatcaQuestions).forEach((questions) => {
      if (!hasYesAnswer) {
        hasYesAnswer = questions.some(
          (question) => question.type === 'bool' && question?.answer === 'Yes'
        );
      }
    });
  }

  return hasYesAnswer;
};

const profileCreationChecksPass = (_, { data }: DoneInvokeSubmittingProfileEvent) =>
  data.aml.pass && data.fatca.pass && data.tin.pass;

const needsFatcaOrTin = (_, { data }: DoneInvokeSubmittingProfileEvent) =>
  data.fatca.additionalDetails || data.tin.additionalDetails;

const needsAmlButNoFatcaOrTin = (_, { data }: DoneInvokeSubmittingProfileEvent) =>
  data.aml.additionalDetails && data.fatca.pass && data.tin.pass;

const oneOfTheProfileCreationChecksFailed = (_, { data }: DoneInvokeSubmittingProfileEvent) =>
  data.aml.fail || data.fatca.fail;

const hasAmlSucceededASecondTime = (_, { data }: DoneInvokeSubmittingAmlEvent) => data.aml.pass;

export default ({
  isAllUk,
  needsFatcaOrTin,
  doesNotNeedAmlChecks,
  needsAmlButNoFatcaOrTin,
  oneOfTheFatcaAnswersIsYes,
  profileCreationChecksPass,
  canContinueFromEnhancedAml,
  hasAmlSucceededASecondTime,
  canContinueFromAdditionalDetails,
  canContinueFromSettingAccountType,
  canContinueFromCountryTaxLiability,
  canContinueFromCreatingCredentials,
  oneOfTheProfileCreationChecksFailed,
  canContinueFromSettingPersonalDetails,
} as unknown) as Record<string, ConditionPredicate<ProfileCreationContext, ProfileCreationEvents>>;
