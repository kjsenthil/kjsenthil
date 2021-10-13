import uniq from 'lodash.uniq';
import { ProfileCreationContext } from './types';
import { fatcaQuestions, ProfileQuestion } from '../../config/profileQuestions';
import countries, { CountryCode } from '../../config/countries';

export const isMultipleCitizenshipCountries = (
  citizenshipCountry: ProfileCreationContext['countryTaxLiability']['citizenshipCountry']
): boolean => Array.isArray(citizenshipCountry) && citizenshipCountry.length > 1;

export const isSingleCitizenshipCountryProvided = (
  citizenshipCountry: ProfileCreationContext['countryTaxLiability']['citizenshipCountry']
): boolean => typeof citizenshipCountry === 'string' && !!citizenshipCountry;

export const setFatcaQuestionsByCountry = (
  countryCodes: Array<CountryCode>
): Record<string, Array<ProfileQuestion>> =>
  countryCodes.reduce((obj, code) => {
    const countryName = countries.find((country) => country.code === code)?.name;
    obj[code] = fatcaQuestions.map((question) => ({
      ...question,
      question: question.question.replace('%country%', String(countryName)),
    }));
    return obj;
  }, {});

export const determineNonUkCountries = (
  citizenshipCountry: ProfileCreationContext['countryTaxLiability']['citizenshipCountry'],
  countryOfBirth: ProfileCreationContext['countryTaxLiability']['countryOfBirth']
): Array<CountryCode> => {
  let citizenshipCountries: Array<CountryCode> = [];

  if (citizenshipCountry !== null) {
    citizenshipCountries = Array.isArray(citizenshipCountry)
      ? citizenshipCountry
      : [citizenshipCountry];

    if (countryOfBirth) {
      citizenshipCountries.push(countryOfBirth);
    }
  }

  return uniq(citizenshipCountries).filter((country) => country !== 'GB');
};

export const questionHasBeenAnswered = (question: ProfileQuestion<unknown>) =>
  (question.type === 'bool' &&
    question?.answer === 'Yes' &&
    question.subQuestionAnswer?.answer !== null) ||
  question?.answer !== null;

export const setQuestionAnswer = <T = unknown>(
  question: ProfileQuestion<T>,
  answer: string,
  subAnswer?: string
): ProfileQuestion<T> => {
  const questionAnswered = {
    ...question,
    answer,
    subQuestionAnswer:
      question.subQuestionAnswer && subAnswer
        ? {
            ...question.subQuestionAnswer,
            answer: subAnswer,
          }
        : question.subQuestionAnswer,
  };

  if (!questionAnswered.subQuestionAnswer) {
    Reflect.deleteProperty(questionAnswered, 'subQuestionAnswer');
  }

  return questionAnswered;
};
