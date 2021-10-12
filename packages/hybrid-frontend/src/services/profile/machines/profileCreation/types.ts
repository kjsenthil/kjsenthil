import { AddressLookupContext } from '../../../addressLookup/machines/addressLookup/types';
import { CountryCode } from '../../config/countries';
import { ProfileQuestion } from '../../config/profileQuestions';
import { Title } from '../../config/titles';

export type Genders = 'Male' | 'Female';

export type AmlDetails = {
  passport?: {
    passportNumber?: string;
    countryCode?: string;
    expiryDate?: {
      d: number;
      m: number;
      y: number;
    };
  };
  drivingLicenseNumber?: string;
};

export interface ProfileCreationContext {
  accountType: 'personal' | 'child' | null;
  credentials: {
    username: string | null;
    password: string | null;
    email: string | null;
    pin: string | null;
  };
  personalDetails: {
    title: Title | null;
    gender: Genders | null;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
    telephone: number | null;
    nino: string | null;
    address: AddressLookupContext['address'] | null;
  };
  countryTaxLiability: {
    citizenshipCountry: CountryCode | Array<CountryCode> | null;
    countryOfBirth: CountryCode | null;
    paysTaxInUK: boolean | null;
  };
  canContinue: {
    fromSettingAccountType: boolean;
    fromCreatingCredentials: boolean;
    fromSettingPersonalDetails: boolean;
    fromCountryTaxLiability: boolean;
    fromAdditionalDetails: boolean;
    fromEnhancedAml: boolean;
  };
  fatcaQuestions: Partial<Record<CountryCode, Array<ProfileQuestion>>> | null;
  tinQuestions: Array<ProfileQuestion<{ code: string; name: string }>> | null;
  amlDetails: AmlDetails | null;
  needsFactaQuestions: boolean;
  needsTinQuestions: boolean;
  needsEnhancedAml: boolean;

  errors:
    | Partial<ProfileCreationContext['credentials'] & ProfileCreationContext['personalDetails']>
    | {};
}

export interface ProfileCreationSchema {
  states: {
    settingAccountType: {};
    creatingCredentials: {
      states: {
        idle: {};
        validating: {};
      };
    };
    settingPersonalDetails: {
      states: {
        idle: {};
        validating: {};
      };
    };
    settingCountryTaxLiability: {
      states: {
        citizenshipCountry: {
          states: {
            none: {};
            uk: {};
            nonUk: {};
            multiple: {};
          };
        };
        countryOfBirth: {
          states: {
            none: {};
            uk: {};
            nonUk: {};
          };
        };
        ukTaxLiability: {
          states: {
            none: {};
            liable: {};
            notLiable: {};
          };
        };
      };
    };
    submittingProfile: {};
    additionalDetails: {
      states: {
        tinAndFatca: {};
        submitAdditionalDetails: {};
      };
    };
    enhancedAml: {
      states: {
        passport: {};
        drivingLicense: {};
        submitEnhancedAml: {};
      };
    };
    success: {};
    hardStop: {};
    failure: {};
  };
}

export type SetAccountTypeEvent = {
  type: 'SET_ACCOUNT_TYPE';
  data: { accountType: ProfileCreationContext['accountType'] };
};

export type SetCredentialsEvent = {
  type: 'SET_CREDENTIALS';
  data: { credentials: Partial<ProfileCreationContext['credentials']> };
};

export type SetPersonalDetailsEvent = {
  type: 'SET_PERSONAL_DETAILS';
  data: {
    personalDetails: Partial<ProfileCreationContext['personalDetails']>;
  };
};

export type SetCitizenshipCountryEvent = {
  type: 'SET_CITIZENSHIP_COUNTRY';
  data: {
    citizenshipCountry: CountryCode;
    isMultiple: boolean;
  };
};

export type SetCountryOfBirthEvent = {
  type: 'SET_COUNTRY_OF_BIRTH';
  data: {
    countryOfBirth: CountryCode;
  };
};

export interface ProfileCreationChecksPassStatus {
  pass: boolean;
  fail: boolean;
  additionalDetails: boolean;
}

export type DoneInvokeSubmittingProfileEvent = {
  type: 'done.invoke.submittingProfile';
  data: {
    aml: ProfileCreationChecksPassStatus;
    fatca: ProfileCreationChecksPassStatus;
    tin: Omit<ProfileCreationChecksPassStatus, 'fail'>;
  };
};

export type DoneInvokeSubmittingAmlEvent = {
  type: 'done.invoke.submittingAml';
  data: {
    aml: ProfileCreationChecksPassStatus;
  };
};

export type SetErrorsEvent = {
  type: 'error.invoke.validating';
  data: ProfileCreationContext['errors'];
};

export type SetTinAnswerEvent = {
  type: 'SET_TIN_ANSWER';
  data: {
    questionIndex: number;
    answer: string;
    subAnswer?: string;
  };
};

export type SetFatcaAnswerEvent = {
  type: 'SET_FATCA_ANSWER';
  data: {
    code: CountryCode;
    questionIndex: number;
    answer: string;
    subAnswer?: string;
  };
};

export type SetPassportDetailsEvent = {
  type: 'SET_PASSPORT_DETAILS';
  data: Pick<AmlDetails, 'passport'>;
};

export type SetDrivingLicenseEvent = {
  type: 'SET_DRIVING_LICENSE_DETAILS';
  data: Pick<AmlDetails, 'drivingLicenseNumber'>;
};

export type ProfileCreationEvents =
  | SetErrorsEvent
  | SetTinAnswerEvent
  | SetAccountTypeEvent
  | SetFatcaAnswerEvent
  | SetCredentialsEvent
  | SetDrivingLicenseEvent
  | SetCountryOfBirthEvent
  | SetPersonalDetailsEvent
  | SetPassportDetailsEvent
  | SetCitizenshipCountryEvent
  | DoneInvokeSubmittingAmlEvent
  | DoneInvokeSubmittingProfileEvent
  | { type: 'BACK' }
  | { type: 'CONTINUE' }
  | { type: 'SELECT_PASSPORT' }
  | { type: 'SET_PAYS_TAX_IN_UK' }
  | { type: 'SELECT_DRIVING_LICENSE' }
  | { type: 'SET_COUNTRY_OF_BIRTH_UK' }
  | { type: 'SET_DOES_NOT_PAY_TAX_IN_UK' }
  | { type: 'SET_CITIZENSHIP_COUNTRY_UK' }
  | { type: 'SET_COUNTRY_OF_BIRTH_NON_UK' }
  | { type: 'SET_CITIZENSHIP_COUNTRY_NON_UK' }
  | { type: 'SET_CITIZENSHIP_COUNTRY_MULTIPLE_UK' };
