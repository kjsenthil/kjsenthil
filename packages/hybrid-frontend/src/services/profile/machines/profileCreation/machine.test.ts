import { Interpreter } from 'xstate/lib/interpreter';
import delay from 'delay';
import { interpret } from 'xstate';
import { ProfileCreationEvents, ProfileCreationSchema, ProfileCreationContext } from './types';
import defaultContext from './context';
import ProfileCreationMachine from './machine';
import actions from './actions';
import guards from './guards';
import { AmlDetails } from '.';

jest.mock('../../config/profileQuestions', () => ({
  fatcaQuestions: [
    { question: 'What is your source of wealth?', type: 'text', answer: null },
    {
      question: 'Do you have a business or residence in %country%?',
      type: 'bool',
      answer: null,
    },
    {
      question: 'Do you return to %country% on a regular basis?',
      type: 'bool',
      answer: null,
      subQuestionAnswer: { question: 'How frequently?', type: 'text', answer: null },
    },
  ],

  tinQuestions: [
    {
      question: 'In which other country are you a tax resident?',
      type: 'options',
      options: [
        { id: 1, code: 'US', name: 'United States' },
        { id: 2, code: 'GB', name: 'United Kingdom' },
      ],
      answer: null,
    },
    {
      question: 'Have you been issued with a tax identification number in this country?',
      type: 'bool',
      answer: null,
      subQuestionAnswer: {
        question: 'Please enter your foreign tax identification number',
        answer: null,
        type: 'text',
      },
    },
  ],
}));
const services = {
  validatePersonalDetails: jest.fn(),
  submitProfile: jest.fn(),
  submitAdditionalDetails: jest.fn(),
  submitEnhancedAml: jest.fn(),
};

const config = {
  actions,
  guards,
  services,
};

const errors = {
  username: 'Username already exists',
  password: 'Password is invalid',
  email: 'Email is invalid',
  nino: 'Nino already exists',
  telephone: 'Telephone is invalid',
  pin: 'Pin invalid',
  title: 'Title is required',
  gender: 'Gender is required',
  dateOfBirth: 'date of birth is invalid',
  firstName: 'First name is required',
  lastName: 'Last name is required',
  address: 'address is required',
};

const interpreter = (context?: Partial<ProfileCreationContext>) => {
  let machine = ProfileCreationMachine.withConfig(config as any);
  if (context) {
    machine = machine.withContext({ ...defaultContext, ...context });
  }
  return interpret(machine);
};

let service: Interpreter<ProfileCreationContext, ProfileCreationSchema, ProfileCreationEvents>;

const answerFatca = (code: string, questionIndex: number, answer: string, subAnswer?: string) => {
  service.send('SET_FATCA_ANSWER', {
    data: {
      code,
      questionIndex,
      answer,
      subAnswer,
    },
  });
};

const answerTin = (questionIndex: number, answer: string, subAnswer?: string) => {
  service.send('SET_TIN_ANSWER', {
    data: {
      questionIndex,
      answer,
      subAnswer,
    },
  });
};

const answersExceptLastQuestion = ['Investments', 'No'];

const fastForwardToAdditionalQuestions = async () => {
  service = interpreter().start();
  services.validatePersonalDetails.mockResolvedValue({});
  service.send('SET_ACCOUNT_TYPE', { data: { accountType: 'personal' } });
  service.send('CONTINUE');
  service.send('SET_CREDENTIALS', {
    data: {
      credentials: {
        username: 'savvy-investor',
        password: 'P@55w0rd',
        pin: '123456',
        email: 'john.doe@mail.xyz',
      },
    },
  });
  await delay(0);
  service.send('CONTINUE');
  service.send('SET_PERSONAL_DETAILS', {
    data: {
      personalDetails: {
        title: 'Mr.',
        gender: 'Male',
        firstName: 'John',
        lastName: 'Doe',
        telephone: '07912381232',
        nino: 'JH37141D',
        dateOfBirth: '1988-09-01',
        address: {
          addressLine1: '1 Fox Road',
          addressLine2: null,
          town: 'NORWICH',
          postCode: 'NR14 7PZ',
          country: 'United Kingdom',
        },
      },
    },
  });
  await delay(0);
  service.send('CONTINUE');
  service.send('SET_CITIZENSHIP_COUNTRY_MULTIPLE_UK');
  service.send('SET_COUNTRY_OF_BIRTH_NON_UK');
  service.send('SET_DOES_NOT_PAY_TAX_IN_UK');

  service.send('SET_CITIZENSHIP_COUNTRY', {
    data: { isMultiple: true, citizenshipCountry: 'US' },
  });
  service.send('SET_CITIZENSHIP_COUNTRY', {
    data: { isMultiple: true, citizenshipCountry: 'GB' },
  });
  service.send('SET_COUNTRY_OF_BIRTH', { data: { countryOfBirth: 'US' } });
};

const expectSuccess = () => {
  expect(service.state.value).toStrictEqual('success');
  expect(service.state.done).toBeTrue();
};

const expectHardStop = () => {
  expect(service.state.value).toStrictEqual('hardStop');
  expect(service.state.done).toBeTrue();
};

const expectSubmittingAdditionalDetails = () => {
  service.send('CONTINUE');
  expect(service.state.value).toStrictEqual({
    additionalDetails: 'submitAdditionalDetails',
  });
};

describe('Profile Creation State Machine Config', () => {
  const tryToContinue = (stateValue: string | object) => {
    service.send('CONTINUE');
    expect(service.state.value).toStrictEqual(stateValue);
  };

  const expectErrorToBe = (key: string, error: string | undefined) => {
    expect(service.state.context.errors[key]).toStrictEqual(error);
  };

  describe('defaults', () => {
    beforeAll(() => {
      service = interpreter().start();
    });

    it('initializes with settingAccountType state', () => {
      expect(service.state.value).toStrictEqual('settingAccountType');
    });

    it('cannot continue from settingAccountType if an account has not been selected', () => {
      tryToContinue('settingAccountType');
    });

    it('can continue from settingAccountType to creatingCredentials if account type has been selected', () => {
      service.send('SET_ACCOUNT_TYPE', { data: { accountType: 'personal' } });
      service.send('CONTINUE');
      expect(service.state.value).toStrictEqual({ creatingCredentials: 'idle' });
    });

    describe('setting credentials', () => {
      describe.each`
        credentialKey | invalidValue           | validValue                | canFinallyContinue
        ${'username'} | ${'WarrenBuffet'}      | ${'NotWarrenBuffet'}      | ${false}
        ${'password'} | ${'password'}          | ${'p@55w0rd'}             | ${false}
        ${'email'}    | ${'invalidEmail@test'} | ${'valid-email@test.com'} | ${false}
        ${'pin'}      | ${'211'}               | ${'123456'}               | ${true}
      `(
        'setting $credentialKey',
        ({
          credentialKey,
          invalidValue,
          validValue,
          canFinallyContinue,
        }: {
          credentialKey: string;
          invalidValue: string;
          validValue: string;
          canFinallyContinue: boolean;
        }) => {
          it('can set $credentialKey, and state machine invokes validation ', () => {
            services.validatePersonalDetails.mockRejectedValue({
              [credentialKey]: errors[credentialKey],
            });
            service.send('SET_CREDENTIALS', {
              data: { credentials: { [credentialKey]: invalidValue } },
            });
            expect(service.state.context.credentials[credentialKey]).toStrictEqual(invalidValue);
            expect(service.state.context.errors[credentialKey]).toBeUndefined();
            expect(service.state.value).toStrictEqual({ creatingCredentials: 'validating' });
          });

          it('records an error against $credentialKey and transitions back to creatingCredentials.idle', async () => {
            await delay(0);
            expect(service.state.context.errors[credentialKey]).toStrictEqual(
              errors[credentialKey]
            );
            expect(service.state.value).toStrictEqual({ creatingCredentials: 'idle' });
          });

          it('state machine is not allowed to continue', () => {
            tryToContinue({ creatingCredentials: 'idle' });
          });

          it('removes $credentialKey error when corrected', async () => {
            services.validatePersonalDetails.mockResolvedValue({});
            service.send('SET_CREDENTIALS', {
              data: { credentials: { [credentialKey]: validValue } },
            });
            await delay(0);

            expect(service.state.context.credentials[credentialKey]).toStrictEqual(validValue);
            expectErrorToBe(credentialKey, undefined);
          });

          if (canFinallyContinue) {
            it('state machine is allowed to continue to personal details', () => {
              tryToContinue({ settingPersonalDetails: 'idle' });
            });
          } else {
            it('still does not allow state machine to continue', () => {
              tryToContinue({ creatingCredentials: 'idle' });
            });
          }
        }
      );
    });

    describe('setting personalDetails', () => {
      describe.each`
        personalDetailsKey | invalidValue    | validValue         | canFinallyContinue
        ${'title'}         | ${null}         | ${'Mr.'}           | ${false}
        ${'gender'}        | ${null}         | ${'Female'}        | ${false}
        ${'firstName'}     | ${'@d@'}        | ${'Ada'}           | ${false}
        ${'lastName'}      | ${'L0v3lace'}   | ${'Lovelace'}      | ${false}
        ${'telephone'}     | ${11111}        | ${'0171 231 3412'} | ${false}
        ${'nino'}          | ${'12345678'}   | ${'JH37141D'}      | ${false}
        ${'dateOfBirth'}   | ${'30/02/2001'} | ${'28/02/2001'}    | ${false}
        ${'address'}       | ${'30/02/2001'} | ${'28/02/2001'}    | ${true}
      `(
        'setting $personalDetailsKey',
        ({
          personalDetailsKey,
          invalidValue,
          validValue,
          canFinallyContinue,
        }: {
          personalDetailsKey: string;
          invalidValue: string;
          validValue: string;
          canFinallyContinue: boolean;
        }) => {
          it('can set $personalDetailsKey, and state machine invokes validation ', () => {
            services.validatePersonalDetails.mockRejectedValue({
              [personalDetailsKey]: errors[personalDetailsKey],
            });
            service.send('SET_PERSONAL_DETAILS', {
              data: { personalDetails: { [personalDetailsKey]: invalidValue } },
            });
            expect(service.state.context.personalDetails[personalDetailsKey]).toStrictEqual(
              invalidValue
            );
            expect(service.state.context.errors[personalDetailsKey]).toBeUndefined();
            expect(service.state.value).toStrictEqual({ settingPersonalDetails: 'validating' });
          });

          it('records an error against $personalDetailsKey and transitions back to settingPersonalDetails.idle', async () => {
            await delay(0);
            expect(service.state.context.errors[personalDetailsKey]).toStrictEqual(
              errors[personalDetailsKey]
            );
            expect(service.state.value).toStrictEqual({ settingPersonalDetails: 'idle' });
          });

          it('state machine is not allowed to continue', () => {
            tryToContinue({ settingPersonalDetails: 'idle' });
          });

          it('removes $personalDetailsKey error when corrected', async () => {
            services.validatePersonalDetails.mockResolvedValue({});
            service.send('SET_PERSONAL_DETAILS', {
              data: { personalDetails: { [personalDetailsKey]: validValue } },
            });
            await delay(0);

            expect(service.state.context.personalDetails[personalDetailsKey]).toStrictEqual(
              validValue
            );
            expectErrorToBe(personalDetailsKey, undefined);
          });

          if (canFinallyContinue) {
            it('state machine is allowed to continue to settingCountryTaxLiability', () => {
              tryToContinue({
                settingCountryTaxLiability: {
                  citizenshipCountry: 'none',
                  countryOfBirth: 'none',
                  ukTaxLiability: 'none',
                },
              });
            });
          } else {
            it('still does not allow state machine to continue', () => {
              tryToContinue({ settingPersonalDetails: 'idle' });
            });
          }
        }
      );
    });

    describe('settingCountryTaxLiability with parallel states', () => {
      describe('happy path - all country tax liability is UK', () => {
        it('starts with nothing selected for citizenshipCountry, countryOfBirth and ukTaxLiability', () => {
          expect(service.state.context.countryTaxLiability).toStrictEqual({
            citizenshipCountry: null,
            paysTaxInUK: null,
            countryOfBirth: null,
          });
        });

        it('cannot continue if all countryTaxLiability are at "none" state', () => {
          tryToContinue({
            settingCountryTaxLiability: {
              citizenshipCountry: 'none',
              countryOfBirth: 'none',
              ukTaxLiability: 'none',
            },
          });
        });

        it('sets UK as the citizenshipCountry, countryOfBirth and tax liability', () => {
          expect(service.state.context.countryTaxLiability.citizenshipCountry).toBeNull();
          service.send('SET_CITIZENSHIP_COUNTRY_UK');
          service.send('SET_COUNTRY_OF_BIRTH_UK');
          service.send('SET_PAYS_TAX_IN_UK');
          expect(service.state.context.countryTaxLiability).toStrictEqual({
            citizenshipCountry: 'GB',
            countryOfBirth: 'GB',
            paysTaxInUK: true,
          });
          expect(service.state.value).toStrictEqual({
            settingCountryTaxLiability: {
              citizenshipCountry: 'uk',
              countryOfBirth: 'uk',
              ukTaxLiability: 'liable',
            },
          });
        });

        it('can continue to submittingProfile', () => {
          services.submitProfile.mockResolvedValue({
            aml: {
              pass: true,
              additionalDetails: false,
            },
            fatca: {
              pass: true,
              fail: false,
              additionalDetails: false,
            },
            tin: {
              pass: true,
              additionalDetails: false,
            },
          });
          tryToContinue('submittingProfile');
        });

        it('resolves and transitions to success', async () => {
          await delay(0);
          expectSuccess();
        });
      });
    });

    describe('settingCountryTaxLiability with parallel states', () => {
      describe('alternative paths', () => {
        describe('sad path - hard stop', () => {
          beforeAll(async () => {
            await fastForwardToAdditionalQuestions();
          });
          it('goes into additionalDetails if requires additional questions', async () => {
            services.submitProfile.mockResolvedValue({
              aml: {
                pass: false,
                fail: true,
                additionalDetails: false,
              },
              fatca: {
                pass: false,
                fail: true,
                additionalDetails: false,
              },
              tin: {
                pass: false,
                additionalDetails: false,
              },
            });

            service.send('CONTINUE');
            await delay(0);
            expectHardStop();
          });
        });

        describe('difficult path - fatca only required', () => {
          beforeAll(async () => {
            await fastForwardToAdditionalQuestions();
          });

          beforeEach(() => {
            services.submitAdditionalDetails.mockResolvedValue({});
          });

          it('goes into additionalDetails if requires additional questions', async () => {
            services.submitProfile.mockResolvedValue({
              aml: {
                pass: true,
                fail: false,
                additionalDetails: false,
              },
              fatca: {
                pass: false,
                fail: false,
                additionalDetails: true,
              },
              tin: {
                pass: true,
                additionalDetails: false,
              },
            });

            service.send('CONTINUE');
            await delay(0);
            expect(service.state.value).toStrictEqual({ additionalDetails: 'tinAndFatca' });
          });

          it('saves fatca questions in context', () => {
            expect(service.state.context.fatcaQuestions).toStrictEqual({
              US: [
                {
                  question: 'What is your source of wealth?',
                  type: 'text',
                  answer: null,
                },
                {
                  question: 'Do you have a business or residence in United States?',
                  type: 'bool',
                  answer: null,
                },
                {
                  question: 'Do you return to United States on a regular basis?',
                  type: 'bool',
                  answer: null,
                  subQuestionAnswer: { question: 'How frequently?', type: 'text', answer: null },
                },
              ],
            });
          });

          it('cannot continue before filling all details', () => {
            service.send('CONTINUE');
            expect(service.state.value).not.toStrictEqual({
              additionalDetails: 'submitAdditionalDetails',
            });
          });

          it('modifies all questions except one given answers', () => {
            answersExceptLastQuestion.forEach((answer, i) => {
              answerFatca('US', i, answer);
            });

            expect(service.state.context.fatcaQuestions).toStrictEqual({
              US: [
                {
                  question: 'What is your source of wealth?',
                  type: 'text',
                  answer: answersExceptLastQuestion[0],
                },
                {
                  question: 'Do you have a business or residence in United States?',
                  type: 'bool',
                  answer: answersExceptLastQuestion[1],
                },
                {
                  question: 'Do you return to United States on a regular basis?',
                  type: 'bool',
                  answer: null,
                  subQuestionAnswer: { question: 'How frequently?', type: 'text', answer: null },
                },
              ],
            });
          });

          it('still continue before filling all details', () => {
            service.send('CONTINUE');
            expect(service.state.value).not.toStrictEqual({
              additionalDetails: 'submitAdditionalDetails',
            });
          });

          it('allows fatca submission after all questions are answered', () => {
            const answers = [...answersExceptLastQuestion, 'No'];
            answerFatca('US', 2, answers[2]);

            expect(service.state.context.fatcaQuestions).toStrictEqual({
              US: [
                {
                  question: 'What is your source of wealth?',
                  type: 'text',
                  answer: answers[0],
                },
                {
                  question: 'Do you have a business or residence in United States?',
                  type: 'bool',
                  answer: answers[1],
                },
                {
                  question: 'Do you return to United States on a regular basis?',
                  type: 'bool',
                  answer: answers[2],
                  subQuestionAnswer: { question: 'How frequently?', type: 'text', answer: null },
                },
              ],
            });

            expectSubmittingAdditionalDetails();
          });

          it('resolves and transitions to success', async () => {
            await delay(0);
            expectSuccess();
          });
        });
      });

      describe('sad path - FATCA only required - one of the answers Yes', () => {
        beforeAll(async () => {
          await fastForwardToAdditionalQuestions();
        });

        beforeEach(() => {
          services.submitAdditionalDetails.mockResolvedValue({});
        });

        it('goes into additionalDetails if requires additional questions', async () => {
          services.submitProfile.mockResolvedValue({
            aml: {
              pass: true,
              fail: false,
              additionalDetails: false,
            },
            fatca: {
              pass: false,
              fail: false,
              additionalDetails: true,
            },
            tin: {
              pass: true,
              additionalDetails: false,
            },
          });

          service.send('CONTINUE');
          await delay(0);
          expect(service.state.value).toStrictEqual({ additionalDetails: 'tinAndFatca' });
        });

        it('allows fatca submission after all questions are answered ', () => {
          const answers = [...answersExceptLastQuestion, 'Yes'];
          answersExceptLastQuestion.forEach((answer, i) => {
            answerFatca('US', i, answer);
          });

          answerFatca('US', 2, answers[2], 'Whatever');

          expect(service.state.context.fatcaQuestions).toStrictEqual({
            US: [
              {
                question: 'What is your source of wealth?',
                type: 'text',
                answer: answers[0],
              },
              {
                question: 'Do you have a business or residence in United States?',
                type: 'bool',
                answer: answers[1],
              },
              {
                question: 'Do you return to United States on a regular basis?',
                type: 'bool',
                answer: answers[2],
                subQuestionAnswer: {
                  question: 'How frequently?',
                  type: 'text',
                  answer: 'Whatever',
                },
              },
            ],
          });

          expectSubmittingAdditionalDetails();
        });

        it('resolves and transitions to hardStop', async () => {
          await delay(0);
          expectHardStop();
        });
      });

      describe('difficult path - FATCA and TIN required but not AML', () => {
        beforeAll(async () => {
          await fastForwardToAdditionalQuestions();
        });

        beforeEach(() => {
          services.submitAdditionalDetails.mockResolvedValue({});
        });

        it('goes into additionalDetails if requires additional questions', async () => {
          services.submitProfile.mockResolvedValue({
            aml: {
              pass: true,
              fail: false,
              additionalDetails: false,
            },
            fatca: {
              pass: false,
              fail: false,
              additionalDetails: true,
            },
            tin: {
              pass: false,
              additionalDetails: true,
            },
          });

          service.send('CONTINUE');
          await delay(0);
          expect(service.state.value).toStrictEqual({ additionalDetails: 'tinAndFatca' });
        });

        it('does not allow submission if FATCA are answered but not TIN', () => {
          const answers = [...answersExceptLastQuestion, 'No'];
          answers.forEach((answer, i) => {
            answerFatca('US', i, answer);
          });

          expect(service.state.context.fatcaQuestions).toStrictEqual({
            US: [
              {
                question: 'What is your source of wealth?',
                type: 'text',
                answer: answers[0],
              },
              {
                question: 'Do you have a business or residence in United States?',
                type: 'bool',
                answer: answers[1],
              },
              {
                question: 'Do you return to United States on a regular basis?',
                type: 'bool',
                answer: answers[2],
                subQuestionAnswer: { question: 'How frequently?', type: 'text', answer: null },
              },
            ],
          });

          service.send('CONTINUE');
          expect(service.state.value).toStrictEqual({ additionalDetails: 'tinAndFatca' });
        });

        it('allow submission if FATCA and TIN questions are all answered', () => {
          answerTin(0, 'Ireland');
          answerTin(1, 'Yes', '12345678');

          service.send('CONTINUE');
          expect(service.state.value).toStrictEqual({
            additionalDetails: 'submitAdditionalDetails',
          });
        });

        it('resolves and transitions to success', async () => {
          await delay(0);
          expectSuccess();
        });
      });
    });

    describe('difficult path - AML is required but not FATCA or TIN - passport', () => {
      const expectDoesNotAllowToContinueFromPassport = (passport: AmlDetails['passport']) => {
        service.send('SET_PASSPORT_DETAILS', {
          data: {
            passport,
          },
        });
        service.send('CONTINUE');

        expect(service.state.value).toStrictEqual({ enhancedAml: 'passport' });
      };

      beforeAll(async () => {
        await fastForwardToAdditionalQuestions();
      });

      beforeEach(() => {
        services.submitEnhancedAml.mockResolvedValue({
          aml: {
            pass: true,
            fail: false,
            additionalDetails: true,
          },
        });
      });

      it('goes into enhanced AML if no additional questions are required and enhanced AML is required', async () => {
        services.submitProfile.mockResolvedValue({
          aml: {
            pass: false,
            fail: false,
            additionalDetails: true,
          },
          fatca: {
            pass: true,
            fail: false,
            additionalDetails: false,
          },
          tin: {
            pass: true,
            additionalDetails: false,
          },
        });

        service.send('CONTINUE');
        await delay(0);
        expect(service.state.value).toStrictEqual({ enhancedAml: 'passport' });
      });

      it('can switch between passport and driving license', () => {
        service.send('SELECT_DRIVING_LICENSE');
        expect(service.state.value).toStrictEqual({ enhancedAml: 'drivingLicense' });

        service.send('SELECT_PASSPORT');
        expect(service.state.value).toStrictEqual({ enhancedAml: 'passport' });
      });

      it('does not alow to submit enahnced AML without setting passport or driving license details', () => {
        expectDoesNotAllowToContinueFromPassport({});
      });

      it('does not allow to proceed to submit enhanced AML if passport is missing details', () => {
        expectDoesNotAllowToContinueFromPassport({
          passportNumber: '12345678',
          countryCode: 'GB',
          expiryDate: undefined,
        });

        expectDoesNotAllowToContinueFromPassport({
          passportNumber: undefined,
          countryCode: 'GB',
          expiryDate: {
            d: 1,
            m: 1,
            y: 2022,
          },
        });

        expectDoesNotAllowToContinueFromPassport({
          passportNumber: '12345678',
          countryCode: undefined,
          expiryDate: {
            d: 1,
            m: 1,
            y: 2022,
          },
        });

        expectDoesNotAllowToContinueFromPassport({
          passportNumber: '12345678',
          countryCode: undefined,
        });
      });

      it('allows to proceed to submit enhanced AML if passport details are fully provided', () => {
        service.send('SET_PASSPORT_DETAILS', {
          data: {
            passport: {
              passportNumber: '12345678',
              countryCode: 'GB',
              expiryDate: {
                d: 1,
                m: 1,
                y: 2022,
              },
            },
          },
        });

        service.send('CONTINUE');

        expect(service.state.value).toStrictEqual({ enhancedAml: 'submitEnhancedAml' });
      });

      it('resolves and transitions to success', async () => {
        await delay(0);
        expectSuccess();
      });
    });

    describe('difficult path - AML is required but not FATCA or TIN - drivingLicense', () => {
      beforeAll(async () => {
        await fastForwardToAdditionalQuestions();
      });

      beforeEach(() => {
        services.submitEnhancedAml.mockResolvedValue({
          aml: {
            pass: true,
            fail: false,
            additionalDetails: true,
          },
        });
      });

      it('goes into enhanced AML if no additional questions are required and enhanced AML is required', async () => {
        services.submitProfile.mockResolvedValue({
          aml: {
            pass: false,
            fail: false,
            additionalDetails: true,
          },
          fatca: {
            pass: true,
            fail: false,
            additionalDetails: false,
          },
          tin: {
            pass: true,
            additionalDetails: false,
          },
        });

        service.send('CONTINUE');
        await delay(0);
        service.send('SELECT_DRIVING_LICENSE');
        expect(service.state.value).toStrictEqual({ enhancedAml: 'drivingLicense' });
      });

      it('allows to proceed to submit AML after providing driving license details', async () => {
        service.send('SET_DRIVING_LICENSE_DETAILS', {
          data: {
            drivingLicenseNumber: '12345678',
          },
        });

        service.send('CONTINUE');
        expect(service.state.value).toStrictEqual({ enhancedAml: 'submitEnhancedAml' });
      });

      it('resolves and transitions to success', async () => {
        await delay(0);
        expectSuccess();
      });
    });

    describe('sad path - AML submission fails the second time', () => {
      beforeAll(async () => {
        await fastForwardToAdditionalQuestions();
      });

      beforeEach(() => {
        services.submitEnhancedAml.mockResolvedValue({
          aml: {
            pass: false,
            fail: true,
            additionalDetails: true,
          },
        });
      });

      it('goes into enhanced AML if no additional questions are required and enhanced AML is required', async () => {
        services.submitProfile.mockResolvedValue({
          aml: {
            pass: false,
            fail: false,
            additionalDetails: true,
          },
          fatca: {
            pass: true,
            fail: false,
            additionalDetails: false,
          },
          tin: {
            pass: true,
            additionalDetails: false,
          },
        });

        service.send('CONTINUE');
        await delay(0);
        service.send('SELECT_DRIVING_LICENSE');
        expect(service.state.value).toStrictEqual({ enhancedAml: 'drivingLicense' });

        service.send('SET_DRIVING_LICENSE_DETAILS', {
          data: {
            drivingLicenseNumber: '12345678',
          },
        });

        service.send('CONTINUE');
        expect(service.state.value).toStrictEqual({ enhancedAml: 'submitEnhancedAml' });
      });

      it('resolves and transitions to hardStop', async () => {
        await delay(0);
        expectHardStop();
      });
    });
  });
});
