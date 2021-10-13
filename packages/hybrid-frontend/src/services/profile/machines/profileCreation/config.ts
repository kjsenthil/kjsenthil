import { MachineConfig } from 'xstate';
import { ProfileCreationContext, ProfileCreationSchema, ProfileCreationEvents } from './types';
import context from './context';

const validationStates = (actions: Array<string>) => ({
  states: {
    idle: {
      entry: actions,
    },
    validating: {
      invoke: {
        id: 'validating',
        src: 'validatePersonalDetails',
        onDone: {
          target: 'idle',
          actions: 'resetErrors',
        },
        onError: {
          target: 'idle',
          actions: 'setErrors',
        },
      },
    },
  },
});

const profileCreation: MachineConfig<
  ProfileCreationContext,
  ProfileCreationSchema,
  ProfileCreationEvents
> = {
  id: 'profileCreation',
  initial: 'settingAccountType',
  context,
  states: {
    settingAccountType: {
      on: {
        SET_ACCOUNT_TYPE: {
          actions: ['setAccountType', 'setCanContinueFromSettingAccountType'],
        },
        CONTINUE: {
          target: 'creatingCredentials',
          cond: 'canContinueFromSettingAccountType',
        },
      },
    },
    creatingCredentials: {
      initial: 'idle',
      on: {
        SET_CREDENTIALS: {
          target: '.validating',
          actions: ['setCredentials', 'resetErrors'],
        },
        CONTINUE: {
          target: 'settingPersonalDetails',
          cond: 'canContinueFromCreatingCredentials',
        },
        BACK: 'settingAccountType',
      },
      ...validationStates(['setCanContinueFromCreatingCredentials']),
    },
    settingPersonalDetails: {
      initial: 'idle',
      on: {
        SET_PERSONAL_DETAILS: {
          target: '.validating',
          actions: ['setPersonalDetails', 'resetErrors'],
        },
        CONTINUE: {
          target: 'settingCountryTaxLiability',
          cond: 'canContinueFromSettingPersonalDetails',
        },
        BACK: 'creatingCredentials.idle',
      },
      ...validationStates(['setCanContinueFromSettingPersonalDetails']),
    },
    settingCountryTaxLiability: {
      id: 'settingCountryTaxLiability',
      type: 'parallel',
      on: {
        CONTINUE: {
          target: 'submittingProfile',
          cond: 'canContinueFromCountryTaxLiability',
        },
      },
      states: {
        citizenshipCountry: {
          initial: 'none',
          on: {
            SET_CITIZENSHIP_COUNTRY_UK: '.uk',
            SET_CITIZENSHIP_COUNTRY_NON_UK: '.nonUk',
            SET_CITIZENSHIP_COUNTRY_MULTIPLE_UK: '.multiple',
          },
          states: {
            none: {},
            uk: { entry: ['setCitizenshipCountryUk', 'setCanContinueFromCountryTaxLiability'] },
            nonUk: {
              entry: ['resetCitizenshipCountryToEmptyString'],
              on: {
                SET_CITIZENSHIP_COUNTRY: {
                  actions: ['setCitizenshipCountry', 'setCanContinueFromCountryTaxLiability'],
                },
              },
            },
            multiple: {
              entry: ['resetCitizenshipCountryToEmptyArray'],
              on: {
                SET_CITIZENSHIP_COUNTRY: {
                  actions: ['setCitizenshipCountry', 'setCanContinueFromCountryTaxLiability'],
                },
              },
            },
          },
        },
        countryOfBirth: {
          initial: 'none',
          on: {
            SET_COUNTRY_OF_BIRTH_UK: '.uk',
            SET_COUNTRY_OF_BIRTH_NON_UK: '.nonUk',
          },
          states: {
            none: {},
            uk: { entry: ['setCountryOfBirthUk', 'setCanContinueFromCountryTaxLiability'] },
            nonUk: {
              entry: ['resetCountryOfBirthToEmptyString', 'setCanContinueFromCountryTaxLiability'],
              on: {
                SET_COUNTRY_OF_BIRTH: {
                  actions: ['setCountryOfBirth', 'setCanContinueFromCountryTaxLiability'],
                },
              },
            },
          },
        },
        ukTaxLiability: {
          initial: 'none',
          on: {
            SET_PAYS_TAX_IN_UK: '.liable',
            SET_DOES_NOT_PAY_TAX_IN_UK: '.notLiable',
          },
          states: {
            none: {},
            liable: {
              entry: ['setPaysTaxInUk', 'setCanContinueFromCountryTaxLiability'],
            },
            notLiable: {
              entry: ['setDoesNotPayTaxInUk', 'setCanContinueFromCountryTaxLiability'],
            },
          },
        },
      },
    },
    submittingProfile: {
      invoke: {
        id: 'submittingProfile',
        src: 'submitProfile',
        onDone: [
          {
            target: '#profileCreation.success',
            cond: 'profileCreationChecksPass',
          },
          {
            target: '#profileCreation.hardStop',
            cond: 'oneOfTheProfileCreationChecksFailed',
          },
          {
            target: '#profileCreation.enhancedAml',
            cond: 'needsAmlButNoFatcaOrTin',
            actions: 'setNeedsQuestions',
          },
          {
            target: '#profileCreation.additionalDetails',
            cond: 'doesNotNeedAmlChecks',
            actions: 'setNeedsQuestions',
          },
        ],
        onError: [
          {
            target: '#profileCreation.settingPersonalDetails',
            cond: 'usernameIsNotAvailable',
          },
          {
            target: '#profileCreation.settingPersonalDetails',
            cond: 'ninoIsIncorrect',
          },
          { target: 'failure' },
        ],
      },
    },
    additionalDetails: {
      initial: 'tinAndFatca',
      states: {
        tinAndFatca: {
          entry: ['setFatcaQuestions', 'setTinQuestions'],
          on: {
            SET_FATCA_ANSWER: {
              actions: ['setFatcaAnswer', 'setCanContinueFromAdditionalDetails'],
            },
            SET_TIN_ANSWER: {
              actions: ['setTinAnswer', 'setCanContinueFromAdditionalDetails'],
            },
            CONTINUE: {
              target: 'submitAdditionalDetails',
              cond: 'canContinueFromAdditionalDetails',
            },
          },
        },
        submitAdditionalDetails: {
          invoke: {
            src: 'submitAdditionalDetails',
            onDone: [
              {
                target: '#profileCreation.hardStop',
                cond: 'oneOfTheFatcaAnswersIsYes',
              },
              {
                target: '#profileCreation.success',
                cond: 'doesNotNeedAmlChecks',
              },
              {
                target: '#profileCreation.enhancedAml',
              },
            ],
          },
        },
      },
    },
    enhancedAml: {
      initial: 'passport',
      on: {
        SELECT_PASSPORT: '.passport',
        SELECT_DRIVING_LICENSE: '.drivingLicense',
        CONTINUE: {
          target: '.submitEnhancedAml',
          cond: 'canContinueFromEnhancedAml',
        },
      },
      states: {
        passport: {
          on: {
            SET_PASSPORT_DETAILS: {
              actions: ['setPassportDetails', 'setCanContinueFromEnhancedAml'],
            },
          },
        },
        drivingLicense: {
          on: {
            SET_DRIVING_LICENSE_DETAILS: {
              actions: ['setDrivingLicenseDetails', 'setCanContinueFromEnhancedAml'],
            },
          },
        },
        submitEnhancedAml: {
          invoke: {
            src: 'submitEnhancedAml',
            onDone: [
              {
                target: '#profileCreation.success',
                cond: 'hasAmlSucceededASecondTime',
              },
              {
                target: '#profileCreation.hardStop',
              },
            ],
            onError: {
              target: '#profileCreation.failure',
            },
          },
        },
      },
    },
    success: { type: 'final' },
    hardStop: { type: 'final' },
    failure: { type: 'final' },
  },
};

export default profileCreation;
