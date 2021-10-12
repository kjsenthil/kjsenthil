import { assign, AssignAction } from 'xstate';
import uniq from 'lodash.uniq';
import {
  SetCitizenshipCountryEvent,
  SetCountryOfBirthEvent,
  ProfileCreationContext,
  SetAccountTypeEvent,
  SetCredentialsEvent,
  SetPersonalDetailsEvent,
  SetErrorsEvent,
  SetPassportDetailsEvent,
  SetDrivingLicenseEvent,
  DoneInvokeSubmittingProfileEvent,
  SetFatcaAnswerEvent,
  SetTinAnswerEvent,
  ProfileCreationEvents,
} from './types';
import {
  determineNonUkCountries,
  isMultipleCitizenshipCountries,
  isSingleCitizenshipCountryProvided,
  questionHasBeenAnswered,
  setFatcaQuestionsByCountry,
  setQuestionAnswer,
} from './utils';
import { tinQuestions as defaultTinQuestions } from '../../config/profileQuestions';

const setCitizenshipCountryUk = assign<ProfileCreationContext>(({ countryTaxLiability }) => ({
  countryTaxLiability: { ...countryTaxLiability, citizenshipCountry: 'GB' },
}));

const resetCitizenshipCountryToEmptyString = assign<ProfileCreationContext>(
  ({ countryTaxLiability }) => ({
    countryTaxLiability: { ...countryTaxLiability, citizenshipCountry: null },
  })
);

const resetCountryOfBirthToEmptyString = assign<ProfileCreationContext>(
  ({ countryTaxLiability }) => ({
    countryTaxLiability: { ...countryTaxLiability, countryOfBirth: null },
  })
);

const resetCitizenshipCountryToEmptyArray = assign<ProfileCreationContext>(
  ({ countryTaxLiability }) => ({
    countryTaxLiability: { ...countryTaxLiability, citizenshipCountry: [] },
  })
);

const setCitizenshipCountry = assign<ProfileCreationContext, SetCitizenshipCountryEvent>({
  countryTaxLiability: ({ countryTaxLiability }, { data: { citizenshipCountry, isMultiple } }) => ({
    ...countryTaxLiability,
    citizenshipCountry:
      isMultiple && Array.isArray(countryTaxLiability.citizenshipCountry)
        ? uniq([...(countryTaxLiability.citizenshipCountry || []), citizenshipCountry])
        : citizenshipCountry,
  }),
});

const setCountryOfBirthUk = assign<ProfileCreationContext>({
  countryTaxLiability: ({ countryTaxLiability }) => ({
    ...countryTaxLiability,
    countryOfBirth: 'GB',
  }),
});

const setCountryOfBirth = assign<ProfileCreationContext, SetCountryOfBirthEvent>({
  countryTaxLiability: ({ countryTaxLiability }, { data: { countryOfBirth } }) => ({
    ...countryTaxLiability,
    countryOfBirth,
  }),
});

const setPaysTaxInUk = assign<ProfileCreationContext>({
  countryTaxLiability: ({ countryTaxLiability }) => ({
    ...countryTaxLiability,
    paysTaxInUK: true,
  }),
});

const setDoesNotPayTaxInUk = assign<ProfileCreationContext>({
  countryTaxLiability: ({ countryTaxLiability }) => ({
    ...countryTaxLiability,
    paysTaxInUK: false,
  }),
});

const setNeedsQuestions = assign<ProfileCreationContext, DoneInvokeSubmittingProfileEvent>(
  (_, { data }) => ({
    needsFactaQuestions: data.fatca.additionalDetails,
    needsTinQuestions: data.tin.additionalDetails,
    needsEnhancedAml: data.aml.additionalDetails,
  })
);

const setPersonalDetails = assign<ProfileCreationContext, SetPersonalDetailsEvent>(
  (ctx, { data: { personalDetails } }) => ({
    personalDetails: { ...ctx.personalDetails, ...personalDetails },
  })
);

const setAccountType = assign<ProfileCreationContext, SetAccountTypeEvent>(
  (_, { data: { accountType } }) => ({
    accountType,
  })
);

const setCredentials = assign<ProfileCreationContext, SetCredentialsEvent>({
  credentials: (ctx, { data: { credentials } }) => ({
    ...ctx.credentials,
    ...credentials,
  }),
});

const resetErrors = assign<ProfileCreationContext, SetCredentialsEvent | SetPersonalDetailsEvent>(
  (ctx, { data }) => {
    const credentials = (data as SetCredentialsEvent['data'])?.credentials;
    const personalDetails = (data as SetPersonalDetailsEvent['data'])?.personalDetails;
    const errors = Object.keys(credentials || personalDetails || {}).reduce((obj, key) => {
      Reflect.deleteProperty(obj, key);
      return obj;
    }, ctx.errors);

    return { errors };
  }
);

const setCanContinueFromCountryTaxLiability = assign<ProfileCreationContext>({
  canContinue: ({
    canContinue,
    countryTaxLiability: { citizenshipCountry, countryOfBirth, paysTaxInUK },
  }) => ({
    ...canContinue,
    fromCountryTaxLiability:
      (isSingleCitizenshipCountryProvided(citizenshipCountry) ||
        isMultipleCitizenshipCountries(citizenshipCountry)) &&
      countryOfBirth !== null &&
      paysTaxInUK !== null,
  }),
});

const setCanContinueFromSettingAccountType = assign<ProfileCreationContext>({
  canContinue: ({ canContinue, accountType }) => ({
    ...canContinue,
    fromSettingAccountType: !!accountType,
  }),
});

const setCanContinueFromCreatingCredentials = assign<ProfileCreationContext>(
  ({ canContinue, errors, credentials: { username, password, email, pin } }) => ({
    canContinue: {
      ...canContinue,
      fromCreatingCredentials:
        !!username && !!password && !!email && !!pin && Object.keys(errors).length === 0,
    },
  })
);

const setCanContinueFromSettingPersonalDetails = assign<ProfileCreationContext>(
  ({
    canContinue,
    errors,
    personalDetails: { title, gender, firstName, lastName, dateOfBirth, telephone, nino, address },
  }) => ({
    canContinue: {
      ...canContinue,
      fromSettingPersonalDetails:
        !!title &&
        !!gender &&
        !!nino &&
        !!telephone &&
        !!firstName &&
        !!lastName &&
        !!dateOfBirth &&
        !!address &&
        Object.keys(errors).length === 0,
    },
  })
);

const setCanContinueFromEnhancedAml = assign<ProfileCreationContext>(
  ({ canContinue, amlDetails }) => ({
    canContinue: {
      ...canContinue,
      fromEnhancedAml:
        (!!amlDetails?.passport?.passportNumber &&
          !!amlDetails?.passport?.countryCode &&
          !!amlDetails?.passport?.expiryDate) ||
        !!amlDetails?.drivingLicenseNumber,
    },
  })
);

const setPassportDetails = assign<ProfileCreationContext, SetPassportDetailsEvent>(
  (ctx, { data: { passport } }) => ({
    amlDetails: {
      drivingLicenseNumber: undefined,
      passport: {
        ...ctx.amlDetails?.passport,
        ...passport,
      },
    },
  })
);

const setDrivingLicenseDetails = assign<ProfileCreationContext, SetDrivingLicenseEvent>(
  (_, { data: { drivingLicenseNumber } }) => ({
    passport: undefined,
    amlDetails: {
      drivingLicenseNumber,
    },
  })
);

const setErrors = assign<ProfileCreationContext, SetErrorsEvent>((ctx, event) => ({
  errors: { ...ctx.errors, ...event.data },
}));

const setFatcaQuestions = assign<ProfileCreationContext>(
  ({ needsFactaQuestions, countryTaxLiability: { citizenshipCountry, countryOfBirth } }) => ({
    fatcaQuestions: needsFactaQuestions
      ? setFatcaQuestionsByCountry(determineNonUkCountries(citizenshipCountry, countryOfBirth))
      : null,
  })
);

const setFatcaAnswer = assign<ProfileCreationContext, SetFatcaAnswerEvent>(
  (ctx, { data: { code, questionIndex, answer, subAnswer } }) => {
    const fatcaQuestions = { ...ctx.fatcaQuestions };

    if (fatcaQuestions[code] && fatcaQuestions[code]![questionIndex]) {
      fatcaQuestions[code]![questionIndex] = setQuestionAnswer(
        fatcaQuestions[code]![questionIndex],
        answer,
        subAnswer
      );
    }

    return {
      fatcaQuestions,
    };
  }
);

const setTinAnswer = assign<ProfileCreationContext, SetTinAnswerEvent>((ctx, { data }) => {
  const answeredTinQuestions = [...(ctx.tinQuestions || [])];

  answeredTinQuestions[data.questionIndex] = setQuestionAnswer(
    answeredTinQuestions[data.questionIndex],
    data.answer,
    data.subAnswer
  );

  return {
    tinQuestions: answeredTinQuestions,
  };
});

const setCanContinueFromAdditionalDetails = assign<ProfileCreationContext>(
  ({ fatcaQuestions, needsFactaQuestions, needsTinQuestions, tinQuestions, canContinue }) => {
    let hasAnsweredAllFatcaQuestions = false;
    let hasAnsweredAllTinQuestions = false;

    if (needsFactaQuestions && fatcaQuestions) {
      Object.values(fatcaQuestions).forEach((questions) => {
        if (!hasAnsweredAllFatcaQuestions) {
          hasAnsweredAllFatcaQuestions = questions.every(questionHasBeenAnswered);
        }
      });
    }

    const passesFatcaQuestions =
      (needsFactaQuestions && hasAnsweredAllFatcaQuestions) || !needsFactaQuestions;

    if (needsTinQuestions && tinQuestions) {
      hasAnsweredAllTinQuestions = tinQuestions.every(questionHasBeenAnswered);
    }

    const passesTinQuestions =
      (needsTinQuestions && hasAnsweredAllTinQuestions) || !needsTinQuestions;

    return {
      canContinue: {
        ...canContinue,
        fromAdditionalDetails: passesFatcaQuestions && passesTinQuestions,
      },
    };
  }
);

const setTinQuestions = assign<ProfileCreationContext>((ctx) => ({
  tinQuestions: ctx.needsTinQuestions ? defaultTinQuestions : [],
}));

export default ({
  setErrors,
  resetErrors,
  setTinAnswer,
  setFatcaAnswer,
  setAccountType,
  setPaysTaxInUk,
  setCredentials,
  setTinQuestions,
  setCountryOfBirth,
  setFatcaQuestions,
  setNeedsQuestions,
  setPassportDetails,
  setPersonalDetails,
  setCountryOfBirthUk,
  setDoesNotPayTaxInUk,
  setCitizenshipCountry,
  setCitizenshipCountryUk,
  setDrivingLicenseDetails,
  setCanContinueFromEnhancedAml,
  resetCountryOfBirthToEmptyString,
  setCanContinueFromAdditionalDetails,
  resetCitizenshipCountryToEmptyArray,
  resetCitizenshipCountryToEmptyString,
  setCanContinueFromSettingAccountType,
  setCanContinueFromCreatingCredentials,
  setCanContinueFromCountryTaxLiability,
  setCanContinueFromSettingPersonalDetails,
} as unknown) as AssignAction<ProfileCreationContext, ProfileCreationEvents>;
