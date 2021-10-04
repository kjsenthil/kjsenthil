import isEmail from 'validator/lib/isEmail';

export interface ValidateEmailProps {
  ignoreMaxLength?: boolean;
  blacklistedChars?: string;
}

const validateEmail = (
  email,
  { ignoreMaxLength = false, blacklistedChars = '' }: ValidateEmailProps
): boolean =>
  isEmail(email, { ignore_max_length: ignoreMaxLength, blacklisted_chars: blacklistedChars });

export default validateEmail;
