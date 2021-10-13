import { ProfileCreationContext } from './types';

const context: ProfileCreationContext = {
  accountType: null,
  credentials: {
    username: null,
    password: null,
    email: null,
    pin: null,
  },
  personalDetails: {
    title: null,
    gender: null,
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    telephone: null,
    nino: null,
    address: null,
  },
  countryTaxLiability: {
    citizenshipCountry: null,
    countryOfBirth: null,
    paysTaxInUK: null,
  },
  canContinue: {
    fromSettingAccountType: false,
    fromCreatingCredentials: false,
    fromSettingPersonalDetails: false,
    fromCountryTaxLiability: false,
    fromAdditionalDetails: false,
    fromEnhancedAml: false,
  },
  fatcaQuestions: null,
  tinQuestions: null,
  amlDetails: null,
  needsFactaQuestions: false,
  needsTinQuestions: false,
  needsEnhancedAml: false,
  errors: {},
};

export default context;
