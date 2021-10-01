import isStrongPassword from 'validator/lib/isStrongPassword';
import matches from 'validator/lib/matches';

export interface ValidatePasswordProps {
  minLength?: number;
  minLowercase?: number;
  minUppercase?: number;
  minNumbers?: number;
  minSymbols?: number;
  numDifferentTypes?: number;
}

const validatePassword = (
  password,
  {
    minLength = 12,
    minLowercase = 0,
    minUppercase = 0,
    minNumbers = 0,
    minSymbols = 0,
    numDifferentTypes = 3,
  }: ValidatePasswordProps
): boolean => {
  const lengthCheck = isStrongPassword(password, {
    minLength,
    minLowercase,
    minUppercase,
    minNumbers,
    minSymbols,
  });

  const typesCheck = isStrongPassword(password, {
    returnScore: true,
    pointsPerUnique: 0,
    pointsPerRepeat: 0,
    pointsForContainingLower: 1,
    pointsForContainingUpper: 1,
    pointsForContainingNumber: 1,
    pointsForContainingSymbol: 1,
  });

  return lengthCheck && typesCheck >= numDifferentTypes && !matches(password, ' ');
};

export default validatePassword;
